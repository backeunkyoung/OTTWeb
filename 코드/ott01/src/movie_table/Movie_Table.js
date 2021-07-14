import React from "react";
import { useTable, useSortBy, usePagination } from "react-table";
import {FaCaretSquareUp, FaCaretSquareDown } from "react-icons/fa";

import Movie_Data from "./Movie_Data";
import UseColumns from "./UseColumns";
import "../App.css";

function Movie_Table() {
    const data = Movie_Data();
    const columns = UseColumns();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        // pagination props
        page,
        canNextPage,
        canPreviousPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        { columns, data, initialState : { pageSize : 10 } },
         useSortBy, usePagination );

    return (
    <div className="container">
        <table {...getTableProps()}>
        <thead>
            {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                    {column.isSorted ? (
                        column.isSortedDesc ? (
                        <FaCaretSquareDown />
                        ) : (
                        <FaCaretSquareUp />
                        )
                    ) : (
                        ""
                    )}
                    </span>
                </th>
                ))}
            </tr>
            ))}
        </thead>
        <tbody {...getTableBodyProps()}>
            {page.map(row => {
            prepareRow(row);

            return (
                <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                    return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                })}
                </tr>
            );
            })}
        </tbody>
        </table>
        <div>
        <div>
            <button disabled={!canPreviousPage} onClick={() => previousPage()}>이전 페이지</button>
            <button disabled={!canNextPage} onClick={() => nextPage()}>다음 페이지</button>
        </div>
        <div>
            <span className="pagenum_tag">
                {pageIndex + 1} / {pageOptions.length}
            </span>
        </div>
        </div>
    </div>
    );
}

export default Movie_Table;