import { useState, useEffect, useMemo } from "react";

const Pagination = ({ total, currentPage, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
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

const ColumnVisibilityToggle = ({ columns, visibleColumns, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dropdown mb-3">
      <button
        className="btn btn-outline-secondary dropdown-toggle"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        Column Visibility
      </button>
      {isOpen && (
        <div className="dropdown-menu show" style={{ position: 'relative' }}>
          {columns
            .filter(col => !col.isAction)
            .map((col) => (
              <div key={col.field} className="dropdown-item">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={`col-${col.field}`}
                    checked={visibleColumns.includes(col.field)}
                    onChange={() => onToggle(col.field)}
                  />
                  <label className="form-check-label" htmlFor={`col-${col.field}`}>
                    {col.header}
                  </label>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const DataTable = ({ data = [], columns = [], name }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKey, setSearchKey] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [page, setPage] = useState(1);
  const [visibleColumns, setVisibleColumns] = useState([]);
  const pageSize = 10;

  const filterableCols = useMemo(
    () => columns.filter((c) => !c.isAction),
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
    return columns.filter(col => 
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
    if (!sortKey) return data;
    return [...data].sort((a, b) => {
      const aValue = a[sortKey.field]?.toString().toLowerCase();
      const bValue = b[sortKey.field]?.toString().toLowerCase();
      return aValue > bValue ? 1 : -1;
    });
  }, [data, sortKey]);

  const filteredData = useMemo(() => {
    if (!searchTerm || !searchKey) return sortedData;

    return sortedData.filter((row) =>
      row[searchKey]
        ?.toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
  }, [sortedData, searchTerm, searchKey]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);

  return (
    <div className="card">
      <div className="card-body">
        {/* Column Visibility Toggle */}
      

        {/* Filter */}
        {/* {visibleFilterableCols.length > 0 && ( */}

        <div className="row g-3">

        <div className="col-sm-9">

          <div className="input-group mb-3 ">
            <span className="input-group-text">Filter by :</span>
            <select
              className="form-select"
              value={searchKey || ''}
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
        {/* )} */}
        <div className="col-sm-3">
            <ColumnVisibilityToggle
          columns={columns}
          visibleColumns={visibleColumns}
          onToggle={handleColumnToggle}
        />
        </div>
</div>
        {/* Table */}
        <div className="mt-3 table-responsive">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr className="bg-light">
                {displayColumns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`sort ${col.class || ""}`}
                    onClick={() => !col.isAction && setSortKey(col)}
                    style={{ cursor: !col.isAction ? 'pointer' : 'default' }}
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
                paginatedData.map((row, i) => (
                  <tr key={i}>
                    {displayColumns.map((col, j) => (
                      <td key={j}>
                        {!col.isAction
                          ? row[col.field]
                          : col.actionTemplate
                          ? col.actionTemplate(row)
                          : null}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

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
          total={filteredData.length}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
};export default DataTable;