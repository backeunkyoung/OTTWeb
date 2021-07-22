import React from "react";

const TableHeader = (props) => {
  return (
    // 테이블 컬럼 출력
    <thead>
      <tr>
        {props.columns.map((column) => (
          <th>
            {column.label} 
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;