import React, {useEffect, useState} from 'react';
import './App.css';
import {Outlet, useNavigate} from "react-router-dom";
import {initQuiz, QUICK_MAFF_HIGH_SCORE} from "./utils/util";

function App() {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const init = () => {
            setLoading(true);
            let tmp = {};
            tmp.score = 0;
            tmp = initQuiz(tmp);
            // get high score from local storage
            let storedValue = localStorage.getItem(QUICK_MAFF_HIGH_SCORE);
            if (!storedValue) storedValue = 0;
            tmp.highScore = storedValue;

            setUser(tmp);
            setLoading(false);
        };

        init();

        return () => {};
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

  return (
      <div className="app flex-col">
        <main className="flex-col">
            <Outlet context={{ user, setUser, loading } } />
        </main>
      </div>
  );
}

export default App;
