import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import logo from '../../images/logo.svg'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const RegisterFormToolbar = () => {

  const navigate = useNavigate()

  const goBack = () => {
    navigate(-1);
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#8080ff", justifyContent: "center" }}>
          <div className='buttons-left'>
          <Button className='button' href='/login' sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} onClick={() => goBack()}>Volver</Button>
          <Button className='button' sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} onClick={() => goBack()}>Volver</Button>
          </div>
          <img src={logo} alt='Icon' className='icon'></img>
          <Typography variant="h6" component="div" sx={{ justifyContent: "center", alignContent: "center" }}>
            NOMBRE DE LA APP
          </Typography>
          <div className='buttons-right'>
            <Button className='button' href='/login' sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} onClick={() => goBack()}>Iniciar Sesión</Button>
            <Button className='button' sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} onClick={() => goBack()}>Volver</Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>

  );
}

export default RegisterFormToolbar;
