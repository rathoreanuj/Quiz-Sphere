export default function StartScreen({ numOfQues, dispatch, category, difficulty }) {

    return (
        <div className="start">
            <h2>Welcome to the Quiz !</h2>
            <h3>{numOfQues} questions to test your knowledge</h3>
            <p> Category : {'Mixed Categories'}</p>
            
            <button 
                className="btn btn-ui"
                onClick={() => dispatch({ type: 'start' })}
            >
                Let's Begin
            </button>
        </div>
    );
}