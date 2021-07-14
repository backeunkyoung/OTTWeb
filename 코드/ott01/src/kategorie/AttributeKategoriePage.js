import React from 'react';
import { Button , ButtonGroup } from 'react-bootstrap';

function AttributeKategoriePage() {
    let dropdownOpen = false;    

    return (
        <div>
            <ButtonGroup variant="secondary">
                <Button variant="secondary">공포</Button>
                <Button variant="secondary">스릴러</Button>
                <Button variant="secondary">로맨스</Button>
                <Button variant="secondary">SF</Button>
                <Button variant="secondary">판타지</Button>
                <Button variant="secondary">코미디</Button>
                <Button variant="secondary">액션</Button>
                <Button variant="secondary">추리</Button>
            </ButtonGroup>
        </div>
    );
}

export default AttributeKategoriePage;