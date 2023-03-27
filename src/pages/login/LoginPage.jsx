import React from 'react';
import LoginFormToolbar from '../../components/pure/LoginFormToolbar';
import LoginForm  from '../../components/pure/forms/LoginForm';
import { Button } from '@mui/material';
import google from '../../images/google icono.jpg'
import facebook from '../../images/Facebook logo.png'

const LoginPage = () => {
    return (
        <div>
        <LoginFormToolbar />
            <h1>Inicie Sesión</h1>
            <div className='buttons'>
                <Button sx={{ backgroundColor:"#0000ff", color:"#fff", marginRight:"30px", ":hover":{backgroundColor:"#1b86ff"}}}>
                    Registrarse con Google
                    <img src={google} alt='Icon' className='icon'></img>
                </Button>
                <Button sx={{ backgroundColor:"#0000ff", color:"#fff", ":hover":{backgroundColor:"#1b86ff"}}}>
                    Registrarse con Facebook
                    <img src={facebook} alt='Icon' className='icon'></img>
                </Button>
            </div>
        <LoginForm />
        </div>
    );
}

export default LoginPage;
