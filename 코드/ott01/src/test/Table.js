import React from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

// 코드 재사용성을 높이기 위해 Table = TableHeader + TableBody 형태로 구성
const Table = ({ columns, data }) => {
  return (
    <table className="table">
      <TableHeader // 테이블 헤더 컴포넌트
        columns={columns}
      />
      <TableBody // 테이블 내용 컴포넌트
        data={data}
        columns={columns}
      />
    </table>
  );
};

export default Table;