import { useState, useEffect, useMemo } from "react";
import "./DataTable.css";

const Pagination = ({ total = 0, currentPage = 1, pageSize = 10, onPageChange }) => {
  const safeTotal = typeof total === 'number' && total >= 0 ? total : 0;
  const totalPages = Math.ceil(safeTotal / pageSize);
  
  if (totalPages <= 1) {
    return null; // Don't show pagination if only one page or no data
  }
  
  return (
    <nav>
      <ul className="pagination justify-content-end">
        {[...Array(totalPages)].map((_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          >
            <button className="page-link" onClick={() => onPageChange(i + 1)}>
              {i + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const ColumnVisibilityModal = ({ columns = [], visibleColumns = [], onToggle, isOpen, onClose }) => {
  if (!isOpen) return null;

  const safeColumns = Array.isArray(columns) ? columns : [];
  const safeVisibleColumns = Array.isArray(visibleColumns) ? visibleColumns : [];

const handleSelectAll = () => {
  safeColumns.filter(col => !col.isAction).forEach(col => {
    if (!safeVisibleColumns.includes(col.field)) {
      onToggle(col.field);
    }
  });
};

  const handleDeselectAll = () => {
    const fieldsToHide = safeVisibleColumns.slice(0, -1); // Keep at least one visible
    fieldsToHide.forEach(field => {
      if (safeVisibleColumns.includes(field)) {
        onToggle(field);
      }
    });
  };

  return (
    <>
      {/* Modal Backdrop */}
      <div 
        className="modal-backdrop fade show" 
        onClick={onClose}
        style={{ zIndex: 1040 }}
      ></div>
      
      {/* Modal */}
      <div 
        className="modal fade show" 
        style={{ display: 'block', zIndex: 1050 }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Column Visibility</h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={onClose}
              ></button>
            </div>
            
            <div className="modal-body">
              <div className="mb-3">
                <button 
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={handleSelectAll}
                >
                  Select All
                </button>
                <button 
                  className="btn btn-sm btn-outline-secondary"
                  onClick={handleDeselectAll}
                >
                  Deselect All
                </button>
              </div>
              
              <div className="border rounded p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {safeColumns
                  .filter(col => !col.isAction)
                  .map((col) => (
                    <div key={col.field} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`col-${col.field}`}
                        checked={safeVisibleColumns.includes(col.field)}
                        onChange={() => onToggle(col.field)}
                      />
                      <label className="form-check-label" htmlFor={`col-${col.field}`}>
                        {col.header}
                      </label>
                    </div>
                  ))}
              </div>
              
              {/* <div className="mt-3 text-muted small">
                <strong>Note:</strong> At least one column must remain visible. Action columns are always shown.
              </div> */}
            </div>
{/*             
            <div className="modal-footer">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={onClose}
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};


const DataTable = ({ data = [], columns = [], name, children, onRowSelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const [showColumnModal, setShowColumnModal] = useState(false);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const pageSize = 10;

  const filterableCols = useMemo(
    () => {
      const safeColumns = Array.isArray(columns) ? columns : [];
      return safeColumns.filter((c) => !c.isAction);
    },
    [columns]
  );

  // Initialize visible columns when columns change
  useEffect(() => {
    if (filterableCols.length) {
      setVisibleColumns(filterableCols.map(col => col.field));
      setSearchKey(filterableCols[0]["field"]);
      setSortKey(filterableCols[0]);
    }
  }, [filterableCols]);

  // Get visible columns for display
  const displayColumns = useMemo(() => {
    const safeColumns = Array.isArray(columns) ? columns : [];
    return safeColumns.filter(col => 
      col.isAction || visibleColumns.includes(col.field)
    );
  }, [columns, visibleColumns]);

  // Get filterable columns that are currently visible
  const visibleFilterableCols = useMemo(() => {
    return filterableCols.filter(col => visibleColumns.includes(col.field));
  }, [filterableCols, visibleColumns]);

  // Update search key if current search key is hidden
  useEffect(() => {
    if (searchKey && !visibleColumns.includes(searchKey) && visibleFilterableCols.length > 0) {
      setSearchKey(visibleFilterableCols[0].field);
    }
  }, [searchKey, visibleColumns, visibleFilterableCols]);

  // Update sort key if current sort key is hidden
  useEffect(() => {
    if (sortKey && !visibleColumns.includes(sortKey.field) && visibleFilterableCols.length > 0) {
      setSortKey(visibleFilterableCols[0]);
    }
  }, [sortKey, visibleColumns, visibleFilterableCols]);

  const handleColumnToggle = (field) => {
    setVisibleColumns(prev => {
      if (prev.includes(field)) {
        // Don't allow hiding all columns
        if (prev.length === 1) return prev;
        return prev.filter(col => col !== field);
      } else {
        return [...prev, field];
      }
    });
  };

  const sortedData = useMemo(() => {
    const safeData = Array.isArray(data) ? data : [];
    if (!sortKey) return safeData;
    return [...safeData].sort((a, b) => {
      const aValue = a[sortKey.field]?.toString().toLowerCase();
      const bValue = b[sortKey.field]?.toString().toLowerCase();
      return aValue > bValue ? 1 : -1;
    });
  }, [data, sortKey]);

  const filteredData = useMemo(() => {
    const safeSortedData = Array.isArray(sortedData) ? sortedData : [];
    if (!searchTerm || !searchKey) return safeSortedData;
    
    return safeSortedData.filter((row) =>
      row[searchKey]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [sortedData, searchTerm, searchKey]);

  const paginatedData = useMemo(() => {
    const safeFilteredData = Array.isArray(filteredData) ? filteredData : [];
    const start = (page - 1) * pageSize;
    return safeFilteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  return (
    <div className="">
      <div className="">

       <div className="card  "> 
        <div className="card-body row ">
          {children?
          (<div className="col-sm-6"> {children}</div>):(<div className="col-sm-6"> '</div>)}
          
          <div className="col-sm-6">

            <div className="d-block d-sm-none mb-1">
              <span className="fw-semibold">Filter by :</span>
            </div>
            <div className="input-group filterby">
              <span className="d-none d-sm-inline">Filter by :</span>
              <select
                className="form-select"
                value={searchKey || ""}
                onChange={(e) => {
                  setSearchKey(e.target.value);
                }}
              >
                {visibleFilterableCols?.map((opt) => (
                  <option key={opt.field} value={opt.field}>
                    {opt.header}
                  </option>
                ))}
              </select>

              <input
                type="text"
                className="form-control"
                placeholder="Filter Text..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

 
        </div>
                 <div className=" ">
            <button
              className="btn settings-btn"
              onClick={() => setShowColumnModal(true)}
            >
              ⚙️
            </button>

            <ColumnVisibilityModal
              columns={columns}
              visibleColumns={visibleColumns}
              onToggle={handleColumnToggle}
              isOpen={showColumnModal}
              onClose={() => setShowColumnModal(false)}
            />
          </div>
</div>
<div className="mt-3 card">
        <div className=" table-responsive ">
          <table className="table table-hover">
            <thead className="table-header">
              <tr className="">
                {displayColumns.map((col, idx) => (
                  <th 
                    key={idx}
                    className={`sort ${col.class || ""}`}
                    onClick={() => !col.isAction && setSortKey(col)}
                    style={{ cursor: !col.isAction ? "pointer" : "default" }}
                  >
                    {col.header}
                    {sortKey && sortKey.field === col.field && (
                      <span className="ms-1">↕</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {!paginatedData.length ? (
                <tr>
                  <td
                    colSpan={displayColumns.length}
                    className="text-center text-muted"
                  >
                    No results found
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, i) => {
                  const globalIndex = (page - 1) * pageSize + i;
                  return (
                    <tr
                      key={i}
                      className={selectedRowIndex === globalIndex ? "table-active" : ""}
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        setSelectedRowIndex(globalIndex);
                        if (onRowSelect) onRowSelect(row);
                      }}
                    >
                      {displayColumns.map((col, j) => (
                        <td key={j} className={` ${col.class || ""}`}>
                         {col.type === 'date' ? (
                           <>{new Date(row[col.field]).toLocaleDateString()}</>
                         ) : (
                          
                      <>
                          {!col.isAction
                            ?(<>{row[col.field]}</>)
                            : col.actionTemplate
                            ? col.actionTemplate(row)
                            : null}  </> )}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div></div>

        {/* Export */}
        <div className="d-flex justify-content-end mb-2">
          {/* <CSVLink
            className="link-secondary text-decoration-underline"
            filename={`${name || 'data'}.csv`}
            data={data}
            headers={visibleFilterableCols.map(col => ({ label: col.header, key: col.field }))}
          >
            Export to Excel
          </CSVLink> */}
        </div>

        {/* Pagination */}
        <Pagination
          total={Array.isArray(filteredData) ? filteredData.length : 0}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};

export default DataTable;