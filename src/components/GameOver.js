import React from 'react';
import {useNavigate, useOutletContext } from 'react-router-dom';
import {initQuiz} from "../utils/util";

function GameOver() {
    const { user, setUser } = useOutletContext();
    const navigate = useNavigate();

    const handleBackToHome = () => {
        let tmp = {};
        tmp.score = 0;
        tmp = initQuiz(tmp);

        setUser(prevUser => ({...prevUser, ...tmp}));
        navigate('/');
    }

    return (
        <div className="flex-col">
            <div className="score-container flex-row">
                <div className="icon-text large-text">🏆High Score: {user.highScore}</div>
                <div className="icon-text large-text">🏆Score: {user.score}</div>
            </div>

            <div className="flex-col game-over-container large-text">
                <div className="center-block">Game Over</div>
                <div className="restart-block" onClick={handleBackToHome}>↻</div>
            </div>
        </div>
    )
}

export default GameOver;
