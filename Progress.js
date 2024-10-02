function Progress({ numOfQues, index, points, maxPossiblePoints, answer }) {
    return (
        <header className="progress">
            <progress max={numOfQues} value={index + Number(answer !== null)} />

            <p> Question <strong>{index + 1}</strong> / {numOfQues} </p>

            <p><strong>{points}</strong> / {maxPossiblePoints}</p>
        </header>
    )
}
export default Progress;
