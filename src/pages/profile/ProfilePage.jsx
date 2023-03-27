import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppToolbar from '../../components/pure/AppToolbar';

const ProfilePage = ({user}) => {

    const navigate = useNavigate()

    const goBack = () => {
        navigate(-1);
    }

    return (
        <div>
            <AppToolbar />
            <h1>Your profile</h1>
            <button onClick={() => goBack()}>Go back</button> 
        </div>
    );
}

export default ProfilePage;
