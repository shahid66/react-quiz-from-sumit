import { getDatabase, ref, set } from 'firebase/database';
import _ from 'lodash';
import { useEffect, useReducer, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext.js';
import useQuizList from '../../../hooks/useQuizList';
import Answers from '../../answers/Answers';
import MiniPlayer from '../../miniPlayer/MiniPlayer.jsx';
import ProgressBar from '../../progressbar/ProgressBar';
import './quiz.css';


const initialState = null;

function reducer(state, action) {
    switch (action.type) {
        case 'questions':
            action.value.forEach(question => {
                question.options.forEach(option => {
                    option.checked = false;
                })
            })
            return action.value;
        case 'answer':
            const questions = _.cloneDeep(state);
            questions[action.questionID].options[action.optionIndex].checked = action.value;
            return questions;
        default:
            return state;
    }
}

const Quiz = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrntQuestion] = useState(0);
    const { id } = useParams();
    const { loading, error, questions } = useQuizList(id)
    const [qna, dispatch] = useReducer(reducer, initialState);
    const { currentUser } = useAuth();
    const { state } = useLocation()
    console.log(state.data)
    useEffect(() => {
        dispatch({
            type: "questions",
            value: questions
        })
    }, [questions])

    const handelAnswerChange = (e, index) => {
        // e.preventDefault();
        dispatch({
            type: "answer",
            questionID: currentQuestion,
            optionIndex: index,
            value: e.target.checked
        });
    }

    function nextQuestion() {
        if (currentQuestion <= questions.length) {
            setCurrntQuestion((prevCurrent) => prevCurrent + 1)
        }
    }

    function prevQuestion() {
        if (currentQuestion >= 1 && currentQuestion <= questions.length) {
            setCurrntQuestion((prevCurrent) => prevCurrent - 1)
        }
    }
    async function submit() {
        const { uid } = currentUser;
        const db = getDatabase();
        const resultRef = ref(db, `result/${uid}`);

        await set(resultRef, {
            [id]: qna
        });
        navigate(`/result/${id}`, { state: qna })
    }

    const percentage = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

    return (
        <>
            {loading && <div>Loading....</div>}
            {error && <div>There was an error!</div>}
            {!loading && !error && qna && qna.length > 0 && (
                <div className="question">
                    <div className="qtitle">
                        <span className="material-icons-outlined"> help_outline </span>
                        {qna[currentQuestion].title}
                    </div>
                    <Answers input={true} options={qna[currentQuestion].options} handelChange={handelAnswerChange} />
                    <ProgressBar next={nextQuestion} previous={prevQuestion} progress={percentage} submit={submit} />
                    <MiniPlayer youtubeID={id} title={state.data} />
                </div>
            )}

        </>
    )
}

export default Quiz