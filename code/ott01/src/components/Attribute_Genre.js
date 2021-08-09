import React from 'react';
import axios from 'axios';

function Attrubute_Genre() {

    function attribute_Filtering() { // server에게 영화DB 받아오기
        var select = document.getElementById("AttributeBox");
        var attribute = select.option[country.selected].value;
        
        console.log("선택한 attribute : " + attribute);
        var url = "/attribute";

        axios.post( url, {
            postAttribute : attribute,
        })  // 성공시 then 진행
        .then(function (res) {
            // 여기서 받아온 res는 JSON 타입
            // console.log("get_movies함수 실행\n" + JSON.stringify(res.data));
            // console.log("추출(첫번째 요소) : \n" + JSON.stringify(res.data.data[0].title));
            console.log("country_Filtering 함수 실행됨");
            console.log("받은 데이터 : \n" + res.data);

        })  // 실패시 catch 진행
        .catch(function (error) {
            alert("error발생 => " + error);
        })
    }

    return (
        <div className="attributeSelect">
            <form>
                <select id="attributeBox">
                    <option value="nono">=== 국가 선택 ===</option>
                    <option value="KR">한국</option>
                    <option value="US">미국</option>
                    <option value="CN">중국</option>
                    <option value="AU">호주</option>
                    <option value="BE">벨기에</option>
                    <option value="BR">캐나다</option>
                    <option value="CH">스위스</option>
                    <option value="DK">덴마크</option>
                    <option value="ES">스페인</option>
                    <option value="FR">프랑스</option>
                    <option value="GB">영국</option>
                    <option value="HK">홍콩</option>
                    <option value="IE">아일랜드</option>
                    <option value="IN">인도</option>
                    <option value="IT">이탈리아</option>
                    <option value="JP">일본</option>
                    <option value="NL">네덜란드</option>
                    <option value="RU">러시아</option>
                    <option value="SE">스웨덴</option>
                    <option value="TW">대만</option>
                    <option value="UA">우크라이나</option>
                    <option value="ee">기타</option>
                </select>
            </form>
        </div>
    );
}
export default Attrubute_Genre;  