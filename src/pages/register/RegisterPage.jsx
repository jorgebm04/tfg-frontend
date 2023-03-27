import React from 'react';
import RegisterFormToolbar from '../../components/pure/RegisterFormToolbar';
import RegisterForm from '../../components/pure/forms/RegisterForm'
import { Button } from '@mui/material';
import '../../styles/RegisterPage.css'
import google from '../../images/google icono.jpg'
import facebook from '../../images/Facebook logo.png'

const RegisterPage = () => {
    return (
        <div>
            <RegisterFormToolbar />
            <h1>Crea tu Cuenta</h1>
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
            <RegisterForm />
        </div>
    );
}

export default RegisterPage;
