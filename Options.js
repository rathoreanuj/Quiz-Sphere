function Options({ que, dispatch, answer }) {
    const hasAnswered = (answer !== null );
    return (
        <div className="options">
            {que.options.map((opt, index) => (
                <button
                    className={`btn btn-option 
                        ${index === answer ? 'answer' : ''}
                        
                        ${ hasAnswered ? index === que.correctOption ? 'correct' : 'wrong' :''}`}

                    key={opt}
                   
                    disabled={hasAnswered}

                    onClick={ () => dispatch({
                        type : 'newAnswer' ,
                        payload : index
                    })
                    }>
                    {opt}
                </button>
            ))}
        </div>
    );
}
export default Options;
