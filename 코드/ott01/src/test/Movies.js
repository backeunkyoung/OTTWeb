import React, { Component } from "react";
import { getMovies } from "./MovieService";
import { getGenres } from "./GenreService";
import { paginate } from "./paginate";
import ListGroup from "./ListGroup";
import MoviesTable from "./MoviesTable";
import Pagination from "./P=agination";
import _ from "lodash";

export default class Movies extends Component {
  state = {
    movies: [], // movieService.js에서 가져올 영화 데이터
    genres: [], // genreService.js에서 가져올 장르 데이터
    currentPage: 1, // 현재 페이지 위치
    pageSize: 3, // 한 페이지에 보여줄 콘텐츠 개수
    sortColumn: { path: "title", order: "asc" }, // 정렬 기준 - title, 오름차순
  };

  // 컴포넌트 생성 시 영화와 장르 정보를 state에 저장하는 코드 
  componentDidMount() {
    // genreService.js에선 각각의 장르 정보만 반환하므로 'All Genres'를 새롭게 추가
    // All Genres에 _id 값을 주지 않으면 ListGroup 컴포넌트에서 map() 함수 사용 시 key 속성을 지정할 수 없게 되어 경고 발생
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  // 페이지 변경 이벤트 처리 함수
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  // 장르 변경 이벤트 처리 함수
  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, currentPage: 1 }); // 장르가 바뀔 때마다 1페이지로 초기화해야 2페이지 이상 내용이 없는 장르가 제대로 표시됨
  };


  // 선택된 장르와 그 장르를 기준으로 정렬된 데이터를 반환하는 함수
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    // 선택된 장르와 일치하는 영화 데이터를 얻어옴
    // 1. selectedGenre와 그 _id 값이 모두 존재하는 장르는 All Genres를 제외한 장르이므로 ? 조건으로 진입
    // 2. All Genres는 _id값이 없으므로(값: "") : 조건으로 진입
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

    // orderBy() 함수: 정렬된 배열 반환
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // allMovies 대신 filtered 전달
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies };
  };

  render() {
    const { totalCount, data } = this.getPagedData();

    return (
      /* className이 row(행) 및 col(열)인 div 배치: Bootstrap Grid System */
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>

        <div className="col">
          <p><b>{totalCount}개</b>의 영화 정보가 있습니다.</p>
          <MoviesTable
            movies={data}
            sortColumn={this.state.sortColumn}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={this.state.pageSize}
            currentPage={this.state.currentPage} // 현재 페이지
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}
