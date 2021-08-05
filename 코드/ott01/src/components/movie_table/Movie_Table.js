import React, { useEffect } from "react";
import axios from 'axios';
import Table_Header from "./Table_Header";
import Table_Body from "./Table_Body";

function Movie_Table() {

    return (
        <div>
            <table>
                <tr>
                    <Table_Header></Table_Header>   
                </tr>
                <tr>
                    <Table_Body></Table_Body>
                </tr>
            </table>
        </div>
    )
}

export default Movie_Table