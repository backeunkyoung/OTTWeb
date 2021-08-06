import React, { useEffect } from "react";
import axios from 'axios';
import Movie_Table_Header from "./Movie_Table_Header";
import Movie_Table_Body from "./Movie_Table_Body";

function Movie_Table() {

    return (
        <div>
            <table>
                <tr>
                    <Movie_Table_Header></Movie_Table_Header>   
                </tr>
                <tr>
                    <Movie_Table_Body></Movie_Table_Body>
                </tr>
            </table>
        </div>
    )
}

export default Movie_Table