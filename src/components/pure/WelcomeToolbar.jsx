import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../images/logo.svg'
import '../../styles/WelcomeToolbar.css'

const WelcomeToolbar = ()  => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{backgroundColor:"#8080ff", justifyContent:"center"}}>
        <div className='buttons-left'>
          <Button className='button'>Registrarse</Button>
          <Button className='button'>Iniciar Sesión</Button>
          </div> 
          <img src={logo} alt='Icon' className='icon'></img>
          <Typography variant="h6" component="div" sx={{justifyContent:"center", alignContent:"center" }}>
            NOMBRE DE LA APP
          </Typography>
          <div className='buttons-right'>
          <Button className='button' sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} href="register">Registrarse</Button>
          <Button className='button' sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} href="login">Iniciar Sesión</Button>
          </div>   
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default WelcomeToolbar;