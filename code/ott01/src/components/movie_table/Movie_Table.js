import React, { useState, useEffect } from "react";
import Movie_Table_Header from "./Movie_Table_Header";
import Movie_Table_Body from "./Movie_Table_Body";

function Movie_Table(props) {
    let keyword = props.keyword;

    //console.log("Search_Form에게 받음 : " + data);

    return (
        <div>
            <table>
                <tr>
                    <Movie_Table_Header></Movie_Table_Header>   
                </tr>
                <tr>
                    <Movie_Table_Body keyword={keyword}></Movie_Table_Body>
                </tr>
            </table>
        </div>
    )
}

export default Movie_Table