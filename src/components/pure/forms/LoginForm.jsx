import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'sonner'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../../../styles/Login/LoginPage.css'
import Background from '../../../images/wallpaper.svg'


const validationSchema = yup.object({
    email: yup
        .string('Introduce tu correo')
        .email('Introduce un correo con un fromato valido')
        .required('El correo es obligatorio'),
    password: yup
        .string('Introduce tu contraseña')
        .required('La contraseña es obligatoria')
});

const LoginForm = () => {
    const navigate = useNavigate();
    const defaultTheme = createTheme();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("http://localhost:8080/login", {
                    email: values.email,
                    password: values.password,
                }).then((res) => {
                    console.log(res.data);
                    if (res.data.message === "Email doesn`t exists") {
                        toast.error('No hay ningun usuario registrado con ese email')
                    } else if (res.data.message === "Login Success") {
                        localStorage.setItem('userId', res.data.idUser)
                        navigate('/main')
                    } else {
                        toast.error('La contraseña es incorrecta')
                    }
                }, fail => {
                    console.error(fail);
                });

            } catch (err) {
                alert(err);
            }
        },
    });
    return (
        <ThemeProvider theme={defaultTheme}>
        <Toaster position="top-center" expand={false} richColors  />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:`url(${Background})`
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Inicie Sesion
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                sx={{ marginBottom: '40px' }}
                    fullWidth
                    id="email"
                    name="email"
                    label="Correo*"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                sx={{ marginBottom: '40px' }}
                    fullWidth
                    id="password"
                    name="password"
                    label="Contraseña*"
                    type="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" } }} fullWidth variant="contained" type="submit">
                    Iniciar Sesion
                </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    ¿Olvidó su contraseña?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿No tiene cuenta? Regístrese"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
    );
}

export default LoginForm;
