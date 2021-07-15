import React from 'react';
import { Button , ButtonGroup } from 'react-bootstrap';

function FieldKategoriePage() {
    let dropdownOpen = false;    

    return (
        <div>
            <ButtonGroup className="FieldK">
                <Button variant="secondary">TV프로그램</Button>
                <Button variant="secondary">영화</Button>
                <Button variant="secondary">애니메이션</Button>
            </ButtonGroup>
        </div>
    );
}

export default FieldKategoriePage;