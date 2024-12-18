import { useEffect, useRef } from "react";

function Timer({ dispatch, secondsRemaining }) {
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    const intervalRef = useRef();
    
    useEffect(() => {
        // Clear any existing interval first
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Only start the timer if we have seconds remaining
        if (secondsRemaining > 0) {
            intervalRef.current = setInterval(() => {
                dispatch({ type: 'tick' });
            }, 1000);

            // Cleanup function
            return () => {
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            };
        }
    }, [dispatch, secondsRemaining]); // Added secondsRemaining as a dependency

    return (
        <div className="timer">
            {mins < 10 && '0'}{mins}:{seconds < 10 && '0'}{seconds}
        </div>
    );
}

export default Timer;