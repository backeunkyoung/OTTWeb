import React from "react";
import MovieTableHeader from "./MovieTableHeader";
import MovieTableBody from "./MovieTableBody";

function MovieTable(props) {
    let keyword = props.keyword;
    let genre = props.genre;
    let country = props.country;

    // if (genre) {
    //     console.log("Table쪽 genre : " + JSON.stringify(genre));
    // }

    // if (genre) {
    //     console.log("Table쪽 keyword : " + keyword);
    // }

    return (
        <div>
            <table>
                <tr>
                    <MovieTableHeader></MovieTableHeader>   
                </tr>
                <tr>
                    <MovieTableBody keyword={keyword} genre={genre} country={country}></MovieTableBody>
                </tr>
            </table>
        </div>
    )
}

export default MovieTable