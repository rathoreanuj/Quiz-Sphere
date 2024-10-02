import Options from "./Options";

function Question({ que ,dispatch ,answer}) {
    return (
        <div>
            <h4>{que.question}</h4>
            <Options que={que} dispatch={dispatch} answer={answer} />
        </div>
    );
}
export default Question;
