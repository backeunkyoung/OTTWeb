import React from 'react';
import Select from 'react-select'; 
import axios from 'axios';

const Years = [
  { label: "1", value: 355 },
  { label: "2", value: 54 },
  { label: "3", value: 43 },
  { label: "4", value: 61 },
  { label: "5", value: 965 },
  { label: "6", value: 46 },
  { label: "7", value: 58 }
];

function YearSelect() {
    let yearList = [];

    // server에게 영화DB 받아오기
    var url = "/years_list";

    axios.post( url, {
    })  // 성공시 then 진행
    .then(function (res) {
        let size = res.data.data.length;
        //console.log("size : " + size);

        for (let i = 0; i < size; i++) {
            //console.log("받은 결과 : \n" + JSON.stringify(res.data.data[i]));
            yearList.push(res.data.data[i])
        }
        //console.log("결과 : \n" + JSON.stringify(yearList))
    })  // 실패시 catch 진행
    .catch(function (error) {
        alert("error발생 => " + error);
    })

    return (
        <div>
            <Select
                options={Years}
            >
            </Select>
        </div>
    );
}
export default YearSelect