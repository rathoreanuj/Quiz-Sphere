function FinishScreen({maxPossiblePoints,points,highscore,dispatch}) {
    const percentage = (points/maxPossiblePoints)*100 ;

let emoji;
if (percentage === 100) emoji = "👌";
if (percentage >= 80 && percentage < 100) emoji = "🎉";
if (percentage >= 50 && percentage < 80) emoji = "😃";
if (percentage > 0 && percentage < 50) emoji = "😕";
if (percentage === 0) emoji = "😞";

    return (
        <>
        <p className="result">
            <span>{emoji}</span> Your Score is <strong> {points} </strong>
            out of {maxPossiblePoints} ({Math.ceil(percentage)}%) 
        </p>

        <p className="highscore">( HighestScore : {highscore} points )</p>

        <div>
            <button className="btn btn-ui" 
            onClick={ ()=> dispatch({type:'restart'})}
            > Again Play Quiz </button>
        </div>
        </>
    );
}
export default FinishScreen;
