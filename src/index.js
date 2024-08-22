import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorBoundary from "./components/ErrorBoundary";
import Home from "./components/Home";
import GameOver from "./components/GameOver";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: '/game-over', element: <GameOver /> },
        ],
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ErrorBoundary>
        <RouterProvider router={router} />
    </ErrorBoundary>
);
