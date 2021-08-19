import React, { useState, useEffect } from "react";
import Movie_Table_Header from "./Movie_Table_Header";
import Movie_Table_Body from "./Movie_Table_Body";

function Movie_Table(props) {
    let keyword = props.keyword;
    let genre = props.genre;

    // if (genre) {
    //     console.log("Table쪽 genre : " + JSON.stringify(genre));
    // }

    return (
        <div>
            <table>
                <tr>
                    <Movie_Table_Header></Movie_Table_Header>   
                </tr>
                <tr>
                    <Movie_Table_Body keyword={keyword} genre={genre}></Movie_Table_Body>
                </tr>
            </table>
        </div>
    )
}

export default Movie_Table