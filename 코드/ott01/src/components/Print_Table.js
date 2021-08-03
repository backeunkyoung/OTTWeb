import React, { useState } from "react";
import axios from "axios";
import _ from "lodash";

function Print_Table() {

    function get_movies() { // server에게 영화DB 받아오기
        var url = "/movieTable";

        axios.post( url, {
        })  // 성공시 then 진행
        .then(function (res) {
            // 여기서 받아온 res는 JSON 타입
            console.log("get_movies함수 실행\n" + JSON.stringify(res.data));
            console.log("추출 : \n" + JSON.stringify(res.data[1]));
            console.log("키 개수 : " + Object.keys(res.data).length);

            return res.data;
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }

    var movies = get_movies(); // 영화 데이터(JSON 타입)

    // console.log("movies : \n" + JSON.stringify(movies));

    return(
        <div>
            <h1>테이블 리턴</h1>
        </div>
    )

    // if (count === 0) {
    //     return (<p>컨텐츠 정보가 없습니다.</p>);
    // }
    // else {
    //     return (
    //         <div>
    //             <p>{count}개의 정보가 있습니다.</p>

    //             <table>
    //                 <thead>
    //                     <tr>
    //                         <th>content_id</th>
    //                         <th>title</th>
    //                         <th>summary</th>
    //                         <th>production_country</th>
    //                         <th>field_genre</th>
    //                         <th>screening_date</th>
    //                         <th>age_imformation</th>
    //                         <th>director</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                     {pagedContents.map(content =>
    //                         <tr key={content.content_id}>
    //                             <td>{content.content_id}</td>
    //                             <td>{content.title}</td>
    //                             <td>{content.summary}</td>
    //                             <td>{content.production_country}</td>
    //                             <td>{content.field_genre}</td>
    //                             <td>{content.screening_date}</td>
    //                             <td>{content.age_imformation}</td>
    //                             <td>{content.director}</td>
    //                         </tr>
    //                     )}
    //                 </tbody>
    //             </table>

    //             {/* Pagination 에 데이터 전달, 컴포넌트 불러오기 */}
    //             <Pagination
    //                 pageSize = {pageSize}
    //                 itemsCount = {count}
    //                 currentPage = {currentPage}
    //                 onPageChange = {handlePageChange}
    //             ></Pagination>
    //         </div>
    //     )
    // }
}
export default Print_Table;

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