import React from 'react';
import Options from "./Options";

function decodeHTML(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

function Question({ que, dispatch, answer }) {
    return (
        <div>
            <h3>{decodeHTML(que.question)}</h3>
            <Options que={que} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;