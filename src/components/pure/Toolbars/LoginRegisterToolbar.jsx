import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from '../../../images/logo.svg'
import { useNavigate } from 'react-router-dom';
import '../../../styles/Toolbars/Toolbar.css'

const LoginRegisterToolbar = () => {

    const navigate = useNavigate()

    return (
        <AppBar position="static">
        <Toolbar sx={{ backgroundColor: "#8080ff", justifyContent: "center" }}>
          <div className='LeftToolbarButtons'>
          <Button>Volver</Button>
          </div>
          <img src={logo} alt='Icon' className='ToolbarIcon'></img>
          <Typography variant="h6" component="div" sx={{ justifyContent: "center", alignContent: "center" }}>
            NOMBRE DE LA APP
          </Typography>
          <div className='RightToolbarButtons'>
            <Button sx={{backgroundColor:"#fff", color:"#8080ff",":hover":{backgroundColor:"#c3c3f8",color:"#fff"}, marginRight:5}} onClick={() => navigate(-1)}>Volver</Button>
          </div>
        </Toolbar>
      </AppBar>
    );
}

export default LoginRegisterToolbar;
