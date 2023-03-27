import React from 'react';
import { useNavigate } from 'react-router-dom'

const NotFoundPage = () => {

const navigate = useNavigate();

const goHome = () => {
    navigate('/')
}

    return (
        <div>
            <h1>404 - Page Not Found</h1>
            <button onClick={() => goHome()}>Go back to home page</button>
        </div>
    );
}

export default NotFoundPage;