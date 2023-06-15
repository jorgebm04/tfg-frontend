import React from 'react';
import RegisterToolbar from '../../components/pure/Toolbars/LoginRegisterToolbar';
import RegisterForm from '../../components/pure/Forms/RegisterForm';

const RegisterPage = () => {
    return (
        <div className='RegisterPage'>
            <RegisterToolbar />
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;
