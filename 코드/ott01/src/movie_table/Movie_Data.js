import React, { useMemo } from 'react';

// filed 숫자 값
// TV프로그램 : 01
// 애니메이션 : 02
// 영화 : 03

function Movie_Data() {
    const data = useMemo(() => [
        { movie_pid : "0", title : "식스센스", director : "정철민", field : "TV프로그램", attribute : "추리"},
        { movie_pid : "1", title : "청년경찰", director : "김주환", field : "영화", attribute : "추리"},
        { movie_pid : "2", title : "어나더", director : "미즈시마 츠토무", field : "애니메이션", attribute : "공포"},
        { movie_pid : "3", title : "베테랑", director : "류승완", field : "영화", attribute : "스릴러"},
        { movie_pid : "4", title : "마션", director : "리들리 스콧", field : "영화", attribute : "SF"},
        { movie_pid : "5", title : "진격의 거인", director : "하야시 유이치로", field : "애니메이션", attribute : "판타지"},
        { movie_pid : "6", title : "개그콘서트", director : "김상미", field : "TV프로그램", attribute : "코미디"},
        { movie_pid : "7", title : "경이로운 소문", director : "이세희", field : "애니메이션", attribute : "액션"},
        { movie_pid : "8", title : "킹덤", director : "김은희", field : "TV프로그램", attribute : "액션"},
        { movie_pid : "9", title : "명탐점 코난", director : "아오야마 고쇼", field : "애니메이션", attribute : "추리"},
        { movie_pid : "10", title : "컨저링", director : "스티브 스타놀리스", field : "영화", attribute : "공포"},
        { movie_pid : "11", title : "도깨비", director : "김은숙", field : "TV프로그램", attribute : "로맨스"},
        { movie_pid : "12", title : "식스센스2", director : "정철민", field : "TV프로그램", attribute : "추리"},
        { movie_pid : "13", title : "청년경찰2", director : "김주환", field : "영화", attribute : "추리"},
        { movie_pid : "14", title : "어나더2", director : "미즈시마 츠토무", field : "애니메이션", attribute : "공포"},
        { movie_pid : "15", title : "베테랑2", director : "류승완", field : "영화", attribute : "스릴러"},
        { movie_pid : "16", title : "마션2", director : "리들리 스콧", field : "영화", attribute : "SF"},
        { movie_pid : "17", title : "진격의 거인2", director : "하야시 유이치로", field : "애니메이션", attribute : "판타지"},
        { movie_pid : "18", title : "개그콘서트2", director : "김상미", field : "TV프로그램", attribute : "코미디"},
        { movie_pid : "19", title : "경이로운 소문2", director : "이세희", field : "애니메이션", attribute : "액션"},
        { movie_pid : "20", title : "킹덤2", director : "김은희", field : "TV프로그램", attribute : "액션"},
        { movie_pid : "21", title : "명탐점 코난2", director : "아오야마 고쇼", field : "애니메이션", attribute : "추리"},
        { movie_pid : "22", title : "컨저링2", director : "스티브 스타놀리스", field : "영화", attribute : "공포"},
        { movie_pid : "23", title : "도깨비2", director : "김은숙", field : "TV프로그램", attribute : "로맨스"},
        { movie_pid : "24", title : "식스센스3", director : "정철민", field : "TV프로그램", attribute : "추리"},
        { movie_pid : "25", title : "청년경찰3", director : "김주환", field : "영화", attribute : "추리"},
        { movie_pid : "26", title : "어나더3", director : "미즈시마 츠토무", field : "애니메이션", attribute : "공포"},
        { movie_pid : "27", title : "베테랑3", director : "류승완", field : "영화", attribute : "스릴러"},
        { movie_pid : "28", title : "마션3", director : "리들리 스콧", field : "영화", attribute : "SF"},
        { movie_pid : "29", title : "진격의 거인3", director : "하야시 유이치로", field : "애니메이션", attribute : "판타지"},
        { movie_pid : "30", title : "개그콘서트3", director : "김상미", field : "TV프로그램", attribute : "코미디"},
        { movie_pid : "31", title : "경이로운 소문3", director : "이세희", field : "애니메이션", attribute : "액션"},
        { movie_pid : "32", title : "킹덤3", director : "김은희", field : "TV프로그램", attribute : "액션"},
        { movie_pid : "33", title : "명탐점 코난3", director : "아오야마 고쇼", field : "애니메이션", attribute : "추리"},
        { movie_pid : "34", title : "컨저링3", director : "스티브 스타놀리스", field : "영화", attribute : "공포"},
        { movie_pid : "35", title : "도깨비3", director : "김은숙", field : "TV프로그램", attribute : "로맨스"}
    ],[]);

    return data;
}

export default Movie_Data;