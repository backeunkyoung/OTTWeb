import React, { useState } from "react";
import { paginate } from "./paginate";
import Movie_Data from "./Movie_Data";
import Pagination from "./Pagination";
import "../App.css";

function Content_Table() {
    const info_data = Movie_Data(); // Movie_Data에서 return한 데이터를 받아 옴

    // contesnts : 현재 상태
    // setContents : Setter 함수
    const [contents, setContents] = useState({
        data : info_data,
        pageSize : 7,
        currentPage : 1
    });

    const handlePageChange = (page) => {
        setContents({ ...contents, currentPage : page });
    }

    const {data,  pageSize, currentPage } = contents;

    const pagedContents = paginate(data, currentPage, pageSize);

    const { length : count } = contents.data;   // 컨텐츠 개수

    if (count === 0) {
        return (<p>컨텐츠 정보가 없습니다.</p>);
    }
    else {
        return (
            <div>
                <p>{count}개의 정보가 있습니다.</p>

                <table>
                    <thead>
                        <tr>
                            <th>MOVIE_PID</th>
                            <th>TITLE</th>
                            <th>DIREACTOR</th>
                            <th>FIELD</th>
                            <th>ATTRIBUTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pagedContents.map(content =>
                            <tr key={content.movie_pid}>
                                <td>{content.movie_pid}</td>
                                <td>{content.title}</td>
                                <td>{content.director}</td>
                                <td>{content.field}</td>
                                <td>{content.attribute}</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination 에 data 전달 */}
                <Pagination
                    pageSize = {pageSize}
                    itemsCount = {count}
                    currentPage = {currentPage}
                    onPageChange = {handlePageChange}
                ></Pagination>
            </div>
        );
    }

}

export default Content_Table;