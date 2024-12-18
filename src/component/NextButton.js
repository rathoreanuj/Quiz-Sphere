
function NextButton({ dispatch, answer, index, numOfQues }) {
    if (answer === null) return null;

    if (index < numOfQues - 1)
        return (
            <button className="btn btn-ui" onClick={() =>
                dispatch({ type: 'nextQuestion' })}> Next </button>
        )

    if (index === numOfQues - 1)
        return (
            <button className="btn btn-ui"
                onClick={() => dispatch({ type: 'finish' })}> Wrap Up </button>
        )
}
export default NextButton;
