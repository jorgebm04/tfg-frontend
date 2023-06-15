import React from 'react';
import MainToolbar from '../../components/pure/Toolbars/MainToolbar';
import SubscriptionMain from '../../components/container/SubscriptionMain';
import '../../styles/Main/MainPage.css'

const MainPage = () => {
    return (
        <div className="MainPage">
            <MainToolbar />
            <div className="MainContent">
                <SubscriptionMain />
            </div>
        </div>
    );
}

export default MainPage;
