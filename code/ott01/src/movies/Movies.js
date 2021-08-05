import React, { useState } from "react";
import getMovies from "./MovieService";
import getGenres from "./GenreService";
import { paginate } from "./paginate";
import ListGroup from "./ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./Pagination";
import _ from "lodash";

function Movies() {
  const movies = getMovies(); // movieService.js에서 가져올 영화 데이터
  const genres = getGenres(); // genreService.js에서 가져올 장르 데이터

  // contesnts : 현재 상태
  // setContents : Setter 함수 
  const [contents, setContents] = useState({
    data : movies,    // 영화 데이터
    currentPage : 1,  // 현재 페이지 위치
    pageSize : 3,     // 한 페이지에 보여줄 콘텐츠 개수
  })

  // 페이지 변경 이벤트 처리 함수
  const handlePageChange = (page) => {
    setContents({ ...contents, currentPage : page });
  };

  // 장르 변경 이벤트 처리 함수
  const handleGenreSelect = (genre) => {
    setContents({ selectedGenre: genre, currentPage: 1 }); // 장르가 바뀔 때마다 1페이지로 초기화해야 2페이지 이상 내용이 없는 장르가 제대로 표시됨
  };

  // ** 위의 useState와 같은 역할(동기화와 비슷)
  const { data, currentPage, pageSize } = contents;

  // paginate로 데이터 전달 및 return 값 저장
  const pagedContents = paginate(data, currentPage, pageSize);

  // 컨텐츠(영화) 개수
  const { length : count } = contents.data;

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
                        <th>제목</th>
                        <th>장르</th>
                        <th>개봉 날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {pagedContents.map(content =>
                        <tr key={content.id}>
                            <td>{content.id}</td>
                            <td>{content.title}</td>
                            <td>{content.genre.name}</td>
                            <td>{content.release}</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Pagination 에 데이터 전달, 컴포넌트 불러오기 */}
            <Pagination
                pageSize = {pageSize}
                itemsCount = {count}
                currentPage = {currentPage}
                onPageChange = {handlePageChange}
            ></Pagination>
          </div>
    );
  }


  // // 선택된 장르와 그 장르를 기준으로 정렬된 데이터를 반환하는 함수
  // const getPagedData = () => {
  //   const [states, setStates] = useState({
  //     pageSize : 3,
  //     currentPage : 1,
  //     sortColumn : { path : "title", ofder : "asc"},
  //     selectedGenre,
  //     movies: allMovies,
  //   })

  //   // 선택된 장르와 일치하는 영화 데이터를 얻어옴
  //   // 1. selectedGenre와 그 _id 값이 모두 존재하는 장르는 All Genres를 제외한 장르이므로 ? 조건으로 진입
  //   // 2. All Genres는 _id값이 없으므로(값: "") : 조건으로 진입
  //   const filtered =
  //     selectedGenre && selectedGenre._id
  //       ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
  //       : allMovies;

  //   // orderBy() 함수: 정렬된 배열 반환
  //   const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

  //   // allMovies 대신 filtered 전달
  //   const movies = paginate(sorted, currentPage, pageSize);

  //   return { totalCount: filtered.length, data: movies };
  // };

  // const { totalCount, data } = getPagedData();

  // return (
  //   /* className이 row(행) 및 col(열)인 div 배치: Bootstrap Grid System */
  //   <div className="row">
  //     <div className="col-3">
  //       {/* ListGroup 에 data 전달 */}
  //       <ListGroup
  //         items={this.state.genres}
  //         selectedItem={this.state.selectedGenre}
  //         onItemSelect={this.handleGenreSelect}
  //       ></ListGroup>
  //     </div>

  //     <div className="col">
  //       <p><b>{totalCount}개</b>의 영화 정보가 있습니다.</p>
  //       {/* MoviesTable 에 data 전달 */}
  //       <MoviesTable
  //         movies={data}
  //         sortColumn={sortColumn}
  //         onSort={handleSort}
  //       ></MoviesTable>
  //       {/* Pagination 에 data 전달 */}
  //       <Pagination
  //         itemsCount={totalCount}
  //         pageSize={pageSize}
  //         currentPage={currentPage}
  //         onPageChange={handlePageChange}
  //       ></Pagination>
  //     </div>
  //   </div>
  // );
}

export default Movies;