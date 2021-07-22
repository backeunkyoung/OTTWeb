import React from "react";
import _ from "lodash";

const TableBody = (props) => {
  // item(movie)에서 column에 대응하는 값을 가져오는 함수
  const renderCell = (item, column) => {
    // column에 content 값이 있다면 content 값에 정의된 화살표 코드에 item(movie) 객체를 대입
    if (column.content) {
      return column.content(item);
    }

    // column에 content 값이 없다면 item(movie) 객체에서 column에 대응하는 값을 꺼내옴
    return _.get(item, column.path); // lodash의 get(obejct, path) 함수: object의 path에서 값을 꺼내옴
  };

  // 유일한 키 값을 반환하는 함수
  const createKey = (item, column) => {
    return item._id + (column.path || column.key); // column 배열엔 path 및 key 속성이 모두 정의된 객체가 없으므로 둘 중 하나로부터 값을 가져옴
  };

  const { data, columns } = props;

  return (
    <tbody>
      {/* 행: 모든 영화 정보(data) 중 하나의 영화 정보(item)씩 꺼내며 그려 나감 */}
      {data.map((item) => ( 
        <tr key={item._id}>
          {/* 열: 하나의 영화 정보(item)에서 각 컬럼명(column)에 대응하는 값을 꺼내옴 */}
          {columns.map((column) => (
            <td key={createKey(item, column)}>
              {renderCell(item, column)}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;