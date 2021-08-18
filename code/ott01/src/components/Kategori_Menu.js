import React, { useState, useEffect } from 'react';
import { Collapse, Button, ButtonGroup, CardBody, Card } from 'reactstrap';
import axios from 'axios';

// react 리렌더링 조건
// 1. state 값이 변경될 때
// 2. 새로운 props이 들어올 때
// 3. 부모 컴포넌트가 렌더링 될 때
// 4. forceUpdate가 실행될 때

const Kategori_Menu = (props) => {
    const [collapseAttribute, setCollapseAttribute] = useState(false);  // 장르 Tab open/close 상태
    const [collapseCountry, setCollapseCountry] = useState(false);      // 국가 Tab open/close 상태
  

    const toggleAttribute = () => setCollapseAttribute(!collapseAttribute);
    const toggleCountry = () => setCollapseCountry(!collapseCountry);

    const [genreList, setGenreList] = useState();       // 전체 장르 목록
    const [countryList, setCountryList] = useState();   // 전체 국가 목록

    // const setting = () => window.localStorage.getItem("genreState") || [];
    const [genreState, setGenreState] = useState([])// 장르 버튼 상태 관리

    // 컴포넌트가 마운트 될 때만 실행됨
    // 마운트 : 컴포넌트를 특정 영역에 끼워넣는 행위
    useEffect(() => {
        console.log("마운트")

        function get_genres() { // server에게 장르 목록 받아오기
            var url = "/genres_list";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // 여기서 받아온 res는 JSON 타입
                setGenreList(res.data);

                // 장르 버튼에 상태 속성(id 및 state) 부여
                let size; 
                let genre;

                // 장르 리스트를 받아온 후에 실행됨
                if (genreList) {
                    size = Object.keys(genreList.data).length;
                    genre = genreList.data

                    let pushList = [];

                    console.log("size : " + size)
                    // 장르 버튼 생성
                    for (let i = 0; i < size; i++) {

                        pushList.push({
                            genreID : genre[i].attribute_num,
                            genreClick : false,
                        })
                    }
                    
                    console.log("확인 : " + JSON.stringify(pushList));
                    // window.localStorage.setItem("genreState", pushList);
                    setGenreState(pushList);
                }
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setGenreList("error");
            })
        }
        get_genres();

        function get_country() { // server에게 국가 목록 받아오기
            var url = "/countrys_list";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // 여기서 받아온 res는 JSON 타입
                setCountryList(res.data);
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
                setCountryList("error");
            })
        }
        get_country();

        send_Main_Page();
    },[]);

    const onChange = (e) => {   // 버튼 클릭할때마다 실행
        send_Main_Page()
    }

    function genreClick(genreNum) {
        genreState[genreNum-1].genreClick = !genreState[genreNum-1].genreClick
        
        if (genreState[genreNum-1].genreClick) {    // true
            document.getElementById(genreNum).style.color="blue";
        }
        else {  // false
            document.getElementById(genreNum).style.color="white";
        }
        console.log(genreState[genreNum-1].genreID + "클릭, state : " + genreState[genreNum-1].genreClick)

        onChange();
    }

    // Movie_Table에게 필터 값을 전달하기 위한 함수(장르 버튼을 클릭할 때마다 전송)
    function send_Main_Page() {
        console.log("\n리렌더링!")

        let size = Object.keys(genreState).length;
        let select = [];

        genreState && genreState.map(element => {
            console.log("genreState : " + JSON.stringify(genreState));
            if (element.state === true) {
                select.push({
                    genreID: element.genreNum,
                })
            }
        })

        props.func(select);    // func : Movie_Table에서 받은 Kategori_receive 함수
        console.log("select : " + JSON.stringify(select))
    }
  
    return (
        <div>
            <div>
                <Button color="primary" onClick={toggleAttribute} style={{ marginBottom: '1rem' }}>장르 선택</Button>
                <Collapse isOpen={collapseAttribute}>
                    <Card>
                    <CardBody>
                        <ButtonGroup className="AttributeGenre">
                            {genreList && genreList.data.map(genre =>
                                <div key={genre.attribute_num}>
                                    <Button id={genre.attribute_num}
                                        name={genre.attribute_name}
                                        onClick={() => genreClick(genre.attribute_num)}
                                        color={"secondary"}
                                    >
                                    {genre.attribute_name}
                                    </Button>
                                </div>
                            )} 
                        </ButtonGroup>
                    </CardBody>
                    </Card>
                </Collapse>
            </div>
            <div>
                <Button color="primary" onClick={toggleCountry} style={{ marginBottom: '1rem' }}>국가 선택</Button>
                <Collapse isOpen={collapseCountry}>
                    <Card>
                    <CardBody>
                        <ButtonGroup className="Country">
                            {countryList && countryList.data.map(country =>
                                <div key={country.country_code}>
                                    <Button id={country.country_code} name={country.country_name} variant="secondary">{country.country_name}</Button>
                                </div>
                            )} 
                        </ButtonGroup>
                    </CardBody>
                    </Card>
                </Collapse>
            </div>
        </div>
    );
}
export default Kategori_Menu;