import React from 'react';
import jquery from 'jquery';
import $ from 'jquery';
import { Button , ButtonGroup } from 'react-bootstrap';

function AttributeKategoriePage() {
    let dropdownOpen = false;

    $(document).ready(function() {
        $('.AttributeB').on('click', function (event) {
            var b_id = $(event.target).attr("id");
            alert("해당 id : " + b_id);
        })
    })
   
    const genres = [
        { _id: "8826D329FF117EB2559BE04D3DFE330F", name: "블랙 코미디" },
        { _id: "DD0F413993B0AFD5C8493BCD27E73C21", name: "애니메이션" },
        { _id: "DD63CD95D6DA4B7D098BD64249B23F43", name: "판타지" },
        { _id: "3DA98E33E11A2F37662578A0E8710935", name: "역사" },
    ]

    return (
        <div>
            <ButtonGroup className="AttributeB">
                <Button id="" name="모든 특징" variant="secondary">모든 특징</Button>
                <Button id="8826D329FF117EB2559BE04D3DFE330F" name="블랙 코미디" variant="secondary">블랙 코미디</Button>
                <Button id="DD0F413993B0AFD5C8493BCD27E73C21" name="애니메이션" variant="secondary">애니메이션</Button>
                <Button id="DD63CD95D6DA4B7D098BD64249B23F43" name="판타지" variant="secondary">판타지</Button>
                <Button id="3DA98E33E11A2F37662578A0E8710935" name="역사" variant="secondary">역사</Button>
            </ButtonGroup>
        </div>
    );
}

export default AttributeKategoriePage;