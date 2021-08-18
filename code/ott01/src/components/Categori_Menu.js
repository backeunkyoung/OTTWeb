import React, { useState, useEffect } from 'react';
import { Collapse, Button, ButtonGroup, CardBody, Card } from 'reactstrap';
import axios from 'axios';

// test01 병합

// react 리렌더링 조건
// 1. state 값이 변경될 때
// 2. 새로운 props이 들어올 때
// 3. 부모 컴포넌트가 렌더링 될 때
// 4. forceUpdate가 실행될 때

const Categori_Menu = (props) => {
    const [collapseAttribute, setCollapseAttribute] = useState(false);  // 장르 Tab open/close 상태
    const [collapseCountry, setCollapseCountry] = useState(false);      // 국가 Tab open/close 상태

    const toggleAttribute = () => setCollapseAttribute(!collapseAttribute);
    const toggleCountry = () => setCollapseCountry(!collapseCountry);

    const [genreList, setGenreList] = useState();       // 전체 장르 목록
    const [countryList, setCountryList] = useState();   // 전체 국가 목록

    // 컴포넌트가 마운트 될 때만 실행됨
    // 마운트 : 컴포넌트를 특정 영역에 끼워넣는 행위
    useEffect(() => {
        console.log("마운트")

         // server에게 장르 목록 받아오기
        var genreUrl = "/genres_list";

        axios.post( genreUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            // 여기서 받아온 res는 JSON 타입
            setGenreList(res.data.data);
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            setGenreList("error");
        })

        // server에게 국가 목록 받아오기
        var countryUrl = "/countrys_list";

        axios.post( countryUrl, {
        })  // 성공시 then 진행
        .then(function (res) {
            // 여기서 받아온 res는 JSON 타입
            setCountryList(res.data.data);
        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
            setCountryList("error");
        })
        
        send_Main_Page();
    },[]);


    function genreClick(genreNum) {
        
        document.getElementById(genreNum).style.color = (document.getElementById(genreNum).style.color === 'blue') ? 'white' : 'blue';

        send_Main_Page()
    }

    // Movie_Table에게 필터 값을 전달하기 위한 함수(장르 버튼을 클릭할 때마다 전송)
    function send_Main_Page() {
        console.log("\n리렌더링!");
        let size = (genreList) ? Object.keys(genreList).length : 0;
        let select = [];

        for (let i = 0; i < size; i++) {
            let genre = genreList[i];
            let attribute_num = genre.attribute_num;
            let elColor = document.getElementById(attribute_num).style.color;
            if (elColor === 'blue') {
                select.push( {
                    genreId: attribute_num
                })
            }
        }
        console.log("select : " + JSON.stringify(select));

        props.func(select);    // func : Movie_Table에서 받은 Kategori_receive 함수
    }
  
    return (
        <div>
            <div>
                <Button color="primary" onClick={toggleAttribute} style={{ marginBottom: '1rem' }}>장르 선택</Button>
                <Collapse isOpen={collapseAttribute}>
                    <Card>
                    <CardBody>
                        <ButtonGroup className="AttributeGenre">
                            {genreList && genreList.map(genre =>
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
                            {countryList && countryList.map(country =>
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
export default Categori_Menu;