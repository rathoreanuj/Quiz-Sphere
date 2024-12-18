function Progress({ numOfQues, index, points, maxPossiblePoints, answer }) {
    return (
        <header className="progress">
            <progress max={numOfQues} value={index + Number(answer !== null)} />

            <p> Question <strong>{index + 1}</strong> / {numOfQues} </p>

            
        </header>
    )
}
export default Progress;
