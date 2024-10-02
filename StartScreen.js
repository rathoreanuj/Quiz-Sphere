
export default function StartScreen({ numOfQues, dispatch }) {
    return (
        <div className="start">
            <h2> # Welcome To The Gk Quiz !! </h2>
            <h3> {numOfQues} questions to test your Gk   </h3>
            <button className="btn btn-ui"
                onClick={() => dispatch({ type: 'start' })}>
                Let's Begin </button>
        </div>
    );
}