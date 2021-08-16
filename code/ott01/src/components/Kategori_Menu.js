import React, { useState, useEffect } from 'react';
import { Collapse, Button, ButtonGroup, CardBody, Card } from 'reactstrap';
import axios from 'axios';

const Kategori_Menu = (props) => {
    const [collapseAttribute, setCollapseAttribute] = useState(false);  // 장르
    const [collapseCountry, setCollapseCountry] = useState(false);      // 국가
  
    const toggleAttribute = () => setCollapseAttribute(!collapseAttribute);
    const toggleCountry = () => setCollapseCountry(!collapseCountry);

    const [genreList, setGenreList] = useState();       // 전체 장르 목록
    const [countryList, setCountryList] = useState();   // 전체 국가 목록

    useEffect(() => {
        
        function get_genres() { // server에게 장르 목록 받아오기
            var url = "/genres_list";
    
            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                // 여기서 받아온 res는 JSON 타입
                // console.log("get_genres함수 실행\n" + JSON.stringify(res.data));
                setGenreList(res.data);
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
                // console.log("get_genres함수 실행\n" + JSON.stringify(res.data));
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

    let buttonState = [];

    function setButtonState(genreNum) { // 장르 버튼 상태값 정의
        buttonState.push(
            {
                genreNum: genreNum,
                state: false,
            },
        )
    }

    const onChange = (e) => {   // 버튼 클릭할때마다 실행
        send_Main_Page()
    }

    function genreClick(genreNum) {
        buttonState[genreNum-1].state = !buttonState[genreNum-1].state
        
        if (buttonState[genreNum-1].state) {    // true
            document.getElementById(genreNum).style.color="blue";
        }
        else {  // false
            document.getElementById(genreNum).style.color="white";
        }

        onChange();
    }

    // Movie_Table에게 필터 값을 전달하기 위한 함수
    function send_Main_Page() {
        let select = []    

        buttonState && buttonState.map(element => {
            if (element.state === true) {
                select.push({
                    genreID: element.genreNum,
                })
            }
        })

        props.func(select);    // func : Movie_Table에서 받은 Kategori_receive 함수
        //console.log("select : " + JSON.stringify(select))
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
                                    {setButtonState(genre.attribute_num)}
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
            {/* {send_Main_Page()} Main_Page에게 필터 값 전달 */}
        </div>
    );
}
export default Kategori_Menu;