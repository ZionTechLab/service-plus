import  { useState, useEffect, useMemo } from 'react';
// import InputField from "./InputField";
// import { CSVLink } from 'react-csv';
// import './DataTable.css'; // Add CSS styling

const Pagination = ({ total, currentPage, pageSize, onPageChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  return (
    <nav>
      <ul className="pagination justify-content-end">
        {[...Array(totalPages)].map((_, i) => (
          <li key={i} className={`page-item ${i + 1 === currentPage ? 'active' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(i + 1)}>{i + 1}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

const DataTable = ({ data = [], columns = [], name }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKey, setSearchKey] = useState(null);
  const [sortKey, setSortKey] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const filterableCols = useMemo(() => columns.filter(c => !c.isAction), [columns]);

  useEffect(() => {
    if (filterableCols.length) {
      setSearchKey(filterableCols[0]['field']);
      setSortKey(filterableCols[0]);
    }
  }, [filterableCols]);

// console.log(filterableCols)

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
console.log(searchKey)
    return sortedData.filter(row => row[searchKey]?.toString().toLowerCase().includes(searchTerm.toLowerCase()));
  }, [sortedData, searchTerm, searchKey]);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page]);


  return (
    <div className="card">
      <div className="card-body">





        {/* Filter */}
        {/* <div className="row mb-2">
          <div className="col-sm-6"> */}
<div class="input-group mb-3">
   <span class="input-group-text">Filter by :</span>
    <select className="form-select" onChange={e =>{ setSearchKey(e.target.value)}}>
          {filterableCols?.map((opt) => (
            <option key={opt.field} value={opt.field}>
             { opt.header}
            </option>
          ))}
        </select>

    <input
                type="text"
                className="form-control"
                placeholder="Filter Text..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />



</div>





          {/* </div> */}
        {/* </div> */}

        <div className="row">
          <div className="col-sm-6">
            {/* Slot placeholder */}
          </div>
        </div>

        {/* Table */}
        <div className="mt-3">
          <table className="table table-bordered">
            <thead className="table-light">
              <tr className="bg-light">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className={`sort ${col.class || ''}`}
                    onClick={() => !col.isAction && setSortKey(col)}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody >
              {!paginatedData.length ? (
                <tr>
                  <td colSpan={columns.length} className="text-center text-muted">No results found</td>
                </tr>
              ) : (
                paginatedData.map((row, i) => (
                  <tr key={i}>
                    {columns.map((col, j) => (
                      <td key={j}>
                        {!col.isAction ? (
                          row[col.field]
                        ) : (
                          col.actionTemplate ? col.actionTemplate(row) : null
                        )}
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
            headers={filterableCols.map(col => ({ label: col.header, key: col.field }))}
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
};

export default DataTable;
