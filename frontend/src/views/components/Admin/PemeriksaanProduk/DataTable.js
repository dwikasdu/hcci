

import React from "react";
import { useTable } from "react-table";

const NonEditableCell = ({ cell }) => <div>{cell.value}</div>;
const defaultColumn = {
    Cell: NonEditableCell
};
export default function DataTable({ columns, data, updateMyData, skipPageReset, tableClass, tableHeadClass }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
        updateMyData,
        defaultColumn
    })

    return (
        <>
            <table className={tableClass} {...getTableProps()}>
                <thead className={tableHeadClass} style={{ backgroundColor: "#099f9f", color: "#fff", textAlign: "center" }}>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    );
}