// _를 이용해 배열을 잘라 각 페이지 별로 아이템이 속한 배열을 받아옴
import _ from 'lodash';

// Movies.js 에서 데이터(data, currentPage, pageSize)를 전달받음
export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점

  return _(items)
    .slice(startIndex) // 시작점부터 배열을 자르되
    .take(pageSize) // pageSize만큼의 배열을 취함
    .value(); // lodash wrapper 객체를 regular 배열로 변환
}