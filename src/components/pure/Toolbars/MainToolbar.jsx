import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logo from '../../../images/logo.svg'
import { useNavigate } from 'react-router-dom'
import '../../../styles/Toolbars/Toolbar.css'

const pages = ['Lista de Pagos', 'Resumen de Pagos', 'Ayuda'];
const settings = ['Profile'];

function MainToolbar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function logOut(){
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className='toolbar-container'>
      <AppBar position='static' sx={{width:'100%'}}>
        <Toolbar className='titulo' sx={{backgroundColor: "#8080ff", justifyContent: "center"}}>
          <img src={logo} alt='Icon' className='ToolbarIcon'></img>
          <Typography variant="h6" color="inherit" component="div">
            NOMBRE DE LA APP
          </Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static" sx={{backgroundColor:'#ffffff',width:'100%'}}>
        <Toolbar disableGutters className='menu'>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                className='menus'
                sx={{  marginLeft:'20px', my: 2, color: 'black', display: 'block' }}
                href="/main"
              >
                {pages[0]}
              </Button>

              <Button
                className='menus'
                sx={{  my: 2, color: 'black', display: 'block' }}
                href="/graphics"
              >
                {pages[1]}
              </Button>

              <Button
                className='menus'
                sx={{  my: 2, color: 'black', display: 'block' }}
                href="/faqs"
              >
                {pages[2]}
              </Button>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton href='/profile' sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
            
          </Box>
          <Box>
          <Button sx={{marginLeft:10, marginRight:20}} variant="outlined" onClick={()=>logOut()}>Cerrar Sesión</Button>
          </Box>  
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default MainToolbar;