import React, { useEffect } from 'react';
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

var year_list = [];

function Year_select() {

    useEffect(() => {
        function years_list() { // server에게 영화DB 받아오기
            var url = "/years_list";

            axios.post( url, {
            })  // 성공시 then 진행
            .then(function (res) {
                let size = res.data.data.length;
                console.log("size : " + size);

                for (let i = 0; i < size; i++) {
                    // console.log("받은 결과 : \n" + JSON.stringify(res.data.data[i]));
                    year_list.push(res.data.data[i])
                }
                console.log("결과 : \n" + JSON.stringify(year_list))
            })  // 실패시 catch 진행
            .catch(function (error) {
                alert("error발생 => " + error);
            })
        }

        years_list();
    }, [])  // 대괄호 비워 둠 => 컴포넌트가 처음 나타날때만 실행

    return (
        <div>
            <Select
                options={Years} 
            >
            </Select>
        </div>
    );
}

export default Year_select