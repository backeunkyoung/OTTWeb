import React, { useState } from 'react';
import { Collapse, Button, ButtonGroup, CardBody, Card } from 'reactstrap';

const Kategori_Menu = (props) => {
    const [collapseField, setCollapseField] = useState(false);
    const [collapseAttribute, setCollapseAttribute] = useState(false);
  
    const toggleField = () => setCollapseField(!collapseField);
    const toggleAttribute = () => setCollapseAttribute(!collapseAttribute);

  
    return (
        <div>
            <div>
                <Button color="primary" onClick={toggleField} style={{ marginBottom: '1rem' }}>분야별</Button>
                <Collapse isOpen={collapseField}>
                <Card>
                    <CardBody>
                    <Button>모든 분야</Button>&nbsp;
                    <Button>TV 프로그램</Button>&nbsp;
                    <Button>애니메이션</Button>&nbsp;
                    <Button>영화</Button>&nbsp;
                    </CardBody>
                </Card>
                </Collapse>
            </div>
            <div>
                <Button color="primary" onClick={toggleAttribute} style={{ marginBottom: '1rem' }}>특징별</Button>
                <Collapse isOpen={collapseAttribute}>
                    <Card>
                    <CardBody>
                        <ButtonGroup className="AttributeB">
                            <Button id="" name="모든 특징" variant="secondary">모든 특징</Button>&nbsp;
                            <Button id="8826D329FF117EB2559BE04D3DFE330F" name="블랙 코미디" variant="secondary">블랙 코미디</Button>&nbsp;
                            <Button id="DD0F413993B0AFD5C8493BCD27E73C21" name="애니메이션" variant="secondary">애니메이션</Button>&nbsp;
                            <Button id="DD63CD95D6DA4B7D098BD64249B23F43" name="판타지" variant="secondary">판타지</Button>&nbsp;
                            <Button id="3DA98E33E11A2F37662578A0E8710935" name="역사" variant="secondary">역사</Button>&nbsp;
                        </ButtonGroup>
                    </CardBody>
                    </Card>
                </Collapse>
                </div>
        </div>
    );
}
export default Kategori_Menu;