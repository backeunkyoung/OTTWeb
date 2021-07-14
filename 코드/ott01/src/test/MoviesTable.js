import React from "react";
import Table from "./Table";

const MoviesTable = (props) => {
  const columns = [
    // 일반 컬럼
    { path: "title", label: "Title" },
    { path: "genre.name", label: "Genre" },
    { path: "release", label: "Release" },
    // Like 및 Delete 컬럼은 Like 컴포넌트와 Button 태그를 보여주기 위해 content라는 속성에 JavaScript ES6 코드를 정의
    
  ];

  const { movies, onSort } = props;

  return (
    <Table
      columns={columns}
      data={movies}
      onSort={onSort}
    />
  );
};

export default MoviesTable;