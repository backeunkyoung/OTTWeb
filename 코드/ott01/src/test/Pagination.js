import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const Pagination = (props) => {
  // Movies.js에서 받아온 데이터를 props에 넣음
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  
  // 몇 페이지가 필요한지 계산 => Math.ceil() : 소수점 이하를 올림
  const pageCount = Math.ceil(itemsCount / pageSize);

  // 1페이지 뿐이라면 페이지 수를 보여줄 필요가 없음
  if (pageCount === 1) {
    return null;
  }

  // 페이지 숫자 생성
  // lodash의 range() 함수: 1부터 pageCount+1 까지 1씩 증가하는 배열 생성
  const pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {pages.map((page) => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            {" "}
            {/* Bootstrap을 사용하여 현재 페이지를 시각적으로 표시 */}
            <a className="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>{" "}
            {/* 페이지 번호 클릭 이벤트 처리 함수 지정 */}
          </li>
        ))}
      </ul>
    </nav>
  );
};

// PropTypes를 사용한 타입 체크
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;