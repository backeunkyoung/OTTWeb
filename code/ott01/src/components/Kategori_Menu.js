import React, { useState, useEffect } from 'react';
import { Collapse, Button, ButtonGroup, CardBody, Card } from 'reactstrap';
import axios from 'axios';

const Kategori_Menu = (props) => {
    const [collapseAttribute, setCollapseAttribute] = useState(false);  // 장르
    const [collapseCountry, setCollapseCountry] = useState(false);      // 국가
  
    const toggleAttribute = () => setCollapseAttribute(!collapseAttribute);
    const toggleCountry = () => setCollapseCountry(!collapseCountry);

    const [genreList, setGenreList] = useState();
    const [countryList, setCountryList] = useState();

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

    },[]);
  
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
                                    <Button id={genre.attribute_num} name={genre.attribute_name} variant="secondary">{genre.attribute_name}</Button>
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