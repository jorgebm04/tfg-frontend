import React from 'react';
import WelcomeToolbar from '../../components/pure/Toolbars/WelcomeToolbar';
import '../../styles/Welcome/WelcomePage.css';

const WelcomePage = () => {
    return (
        <div className="WelcomePage">
            <WelcomeToolbar />
            <div className="WelcomeContent">
                <h1 className='WelcomeH1'>Welcome to our website!</h1>
            </div>
        </div>
    );
};

export default WelcomePage;
