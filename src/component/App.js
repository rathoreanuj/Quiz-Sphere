import { useEffect, useReducer, useCallback } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';
import Question from './Question';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Footer from './Footer';
import Timer from './Timer';

const SECS_PER_QUESTION = 30;
const MAX_RETRIES = 3;

const initialState = {
  questions: [],
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  error: null,
  isTimerActive: false
};

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { 
        ...state, 
        questions: action.payload, 
        status: 'ready', 
        error: null 
      };

    case 'dataFailed':
      return { 
        ...state, 
        status: 'error', 
        error: action.payload 
      };

    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
        isTimerActive: true
      };

    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points: action.payload === question.correctOption
          ? state.points + question.points 
          : state.points,
      };

    case 'nextQuestion':
      return { 
        ...state, 
        index: state.index + 1, 
        answer: null 
      };

    case 'finish':
      return {
        ...state,
        status: 'finished',
        isTimerActive: false,
        highscore: state.points > state.highscore ? state.points : state.highscore
      };

    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
        highscore: state.highscore  // Preserve the highscore
      };

    case 'tick':
      // Only process tick if timer is active
      if (!state.isTimerActive) return state;
      
      const newSecondsRemaining = state.secondsRemaining - 1;
      return {
        ...state,
        secondsRemaining: newSecondsRemaining,
        status: newSecondsRemaining < 0 ? 'finished' : state.status,
        isTimerActive: newSecondsRemaining >= 0
      };

    default:
      throw new Error('unknown action');
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { 
    questions, 
    status, 
    index, 
    answer, 
    points, 
    highscore, 
    secondsRemaining, 
    error,
    isTimerActive 
  } = state;

  const numOfQues = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  const fetchQuestions = useCallback(async (retries = 0) => {
    try {
      const res = await fetch('https://opentdb.com/api.php?amount=10&type=multiple');
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const data = await res.json();
      
      if (data.response_code === 0 && Array.isArray(data.results) && data.results.length > 0) {
        const formattedQuestions = data.results.map(question => ({
          question: question.question,
          correctOption: 0,
          options: [
            question.correct_answer,
            ...question.incorrect_answers
          ].sort(() => Math.random() - 0.5),
          points: 10,
        }));
        
        dispatch({ type: 'dataReceived', payload: formattedQuestions });
      } else {
        throw new Error('Invalid response from API');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
      if (retries < MAX_RETRIES) {
        setTimeout(() => fetchQuestions(retries + 1), 2000);
      } else {
        dispatch({ type: 'dataFailed', payload: error.message });
      }
    }
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [fetchQuestions]);

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        
        {status === 'error' && <Error message={error} />}
        
        {status === 'ready' && questions.length > 0 && (
          <StartScreen numOfQues={numOfQues} dispatch={dispatch} />
        )}
        
        {status === 'active' && questions.length > 0 && (
          <>
            <Progress 
              numOfQues={numOfQues} 
              index={index}
              points={points} 
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />

            <Question 
              que={questions[index]} 
              dispatch={dispatch}
              answer={answer} 
            />

            <Footer>
              {isTimerActive && (
                <Timer 
                  dispatch={dispatch} 
                  secondsRemaining={secondsRemaining} 
                />
              )}
              <NextButton 
                dispatch={dispatch} 
                answer={answer}
                index={index} 
                numOfQues={numOfQues} 
              />
            </Footer>
          </>
        )}

        {status === 'finished' && (
          <FinishScreen 
            maxPossiblePoints={maxPossiblePoints}
            points={points} 
            highscore={highscore} 
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}