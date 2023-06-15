import React from 'react';
import LoginToolbar from '../../components/pure/Toolbars/LoginRegisterToolbar';
import LoginForm from '../../components/pure/Forms/LoginForm';
import '../../styles/Login/LoginPage.css'

const LoginPage = () => {
    return (
        <div className='LoginPage'>
            <LoginToolbar />
            <LoginForm />
        </div>
    );
}

export default LoginPage;
