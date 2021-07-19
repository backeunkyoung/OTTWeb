import React, { useState } from 'react';
import { Button, ButtonToolbar, Tab } from 'react-bootstrap';

function Button_tool() {
    const tab_content = [
        {
            tab : "분야별",
            tab_content : "분야 내용"
        },
        {
            tab : "특징별",
            tab_content : "특징 내용"
        }
    ];

    const useTabs = (initialTabs, allTabs) => {
        const [contentIndex, setContentIndex] = useState(initialTabs);
        
        return {
            contentItem: allTabs[contentIndex],
            contentChange: setContentIndex
        };
    };

    const { contentitem, contentChange } = useTabs(0, tab_content)

    return (
        <div className="App">
            {tab_content.map((section, index) => (
                <button onClick={() => contentChange(index)}>{section.tab}</button>
            ))}
            <br />
            <br />
            {contentItem.content}
        </div>

        // <div>
        //     <ButtonToolbar>
        //     <div className="left-box">
        //         <Button className="field" variant="primary">분야별</Button>
        //         <Button className="att" variant="primary">특징별</Button>
        //     </div>

        //     <div className="center-box">
        //         <form action="#" method="post">
        //         <input type="text"></input> <button type="submit" className="search">검색</button>
        //         </form>
        //     </div>

        //     <div className="right-box">
        //         <Button variant="info">로그인</Button>
        //     </div>
        //     </ButtonToolbar>
        // </div>
    );
}
export default Button_tool;