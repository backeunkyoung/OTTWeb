import React from "react";
import { useTable, useGlobalFilter, useSortBy } from "react-table";
import Search from "./Search";

function Search_Form({ columns, data }) {
    const {
        setGlobalFilter,
    } = useTable({ columns, data }, useGlobalFilter, useSortBy);

    return (
        <Search onSubmit = {setGlobalFilter}></Search>
    )
}

export default Search_Form;