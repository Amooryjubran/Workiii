import { useTable, usePagination } from "react-table";
import PropTypes from "prop-types";
import styles from "./style.module.css";

function TableComponent({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: 8 },
    },
    usePagination
  );
  // Create an array of page numbers to map through
  const pageNumbers = [];
  for (let i = 0; i < pageCount; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className={styles.tableContainer}>
      <table {...getTableProps()} className={styles.table}>
        <thead className={styles.thead}>
          {headerGroups.map((headerGroup, headerGroupIndex) => (
            <tr
              key={`headerGroup-${headerGroupIndex}`}
              {...headerGroup.getHeaderGroupProps()}
              className={styles.tr}
            >
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`header-${columnIndex}`}
                  {...column.getHeaderProps()}
                  className={styles.th}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr
                key={`row-${rowIndex}`}
                {...row.getRowProps()}
                className={styles.tr}
              >
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`cell-${cellIndex}`}
                    {...cell.getCellProps()}
                    className={styles.td}
                  >
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className={styles.pagination}>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>
        {pageNumbers.map((number) => (
          <button
            key={number}
            className={
              pageIndex === number ? styles.pageButtonActive : styles.pageButton
            }
            onClick={() => gotoPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>
      </div>
    </div>
  );
}

TableComponent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TableComponent;
