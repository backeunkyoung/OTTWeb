import React, { useEffect } from "react";
import Movie_Table_Header from "./Movie_Table_Header";
import Movie_Table_Body from "./Movie_Table_Body";

function Movie_Table(props) {
    // Search_Form에서 props(영화 정보)를 받아와, Movie_Table_Body로 전달

    return (
        <div>
            <table>
                <tr>
                    <Movie_Table_Header></Movie_Table_Header>   
                </tr>
                <tr>
                    <Movie_Table_Body list={props}></Movie_Table_Body>
                </tr>
            </table>
        </div>
    )
}

export default Movie_Table