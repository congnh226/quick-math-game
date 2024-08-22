import React, {useState, useEffect, useCallback} from 'react';
import {useNavigate, useOutletContext} from "react-router-dom";
import {initQuiz, QUICK_MAFF_HIGH_SCORE} from "../utils/util";

const TIME_OUT_INTERVAL = 5;

function Home() {
    const {user, setUser} = useOutletContext();
    const [isAnswering, setIsAnswering] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [progressBar, setProgressBar] = useState({current: TIME_OUT_INTERVAL, init: TIME_OUT_INTERVAL});
    const navigate = useNavigate();

    const updateUserData = useCallback(async (newData) => {
        setUser(prevUser => ({...prevUser, ...newData}));
    }, [setUser]);

    useEffect(() => {
        // high score system
        if (user.score > user.highScore) {
            updateUserData({highScore: user.highScore + 1});
            localStorage.setItem(QUICK_MAFF_HIGH_SCORE, user.score);
        }
    }, [user.score, user.highScore, updateUserData]);

    useEffect(() => {
        if (isGameOver) navigate('/game-over');
    }, [isGameOver, navigate])

    useEffect(() => {
        let progressInterval;
        progressInterval = setInterval(() => {
            if (!isGameOver) {
                setProgressBar(prevState => {
                    if (prevState.current < 0.1) {
                        setIsGameOver(true);
                    }
                    return {...prevState, current: prevState.current - 0.1};
                });
            }
        }, 100);

        return () => {
            clearInterval(progressInterval);
        }
    }, [isGameOver])

    const handleAnswer = (answer) => {
        if (isAnswering) return;
        setIsAnswering(true);

        // compare result
        const result = user.result === (user.operator === '+' ? user.a + user.b : user.a - user.b);
        const choose = answer === 1;

        if (result === choose) {
            console.log("correct")
            updateUserData(initQuiz(user));
            updateUserData({score: user.score + 1});
            setProgressBar(prevState => ({...prevState, current: TIME_OUT_INTERVAL}));
        } else {
            console.log("wrong");
            setIsGameOver(true);
        }
        setIsAnswering(false);
    };

    return (
        <div className="flex-col">
            <div className="progress-bar-container">
                <div className="progress-bar-background">
                    <div className="progress-bar"
                         style={{width: `${(progressBar.current / progressBar.init) * 100}%`}}></div>
                </div>
            </div>

            <div className="app-container flex-col">
                <div className="score-container flex-row">
                    <div className="icon-text large-text">🏆High Score: {user.highScore}</div>
                    <div className="icon-text large-text">🏆Score: {user.score}</div>
                </div>

                <div className="quiz-container" id='quiz-container'>
                    {user.a}{user.operator}{user.b}={user.result}
                </div>

                <div className='flex-row answer-container'>
                    <button className="answer-button false-button" onClick={e => {e.preventDefault(); handleAnswer(0)}}>&#10006;</button>
                    <button className="answer-button true-button" onClick={e => {e.preventDefault(); handleAnswer(1)}}>&#10004;</button>
                </div>
            </div>
        </div>
    );
}

export default Home;
