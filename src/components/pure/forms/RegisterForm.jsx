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
import Background from '../../../images/wallpaper.svg'
import { request, setUserId, setAuthToken } from '../../../service/axiosHelper';

const validationSchema = yup.object({
    name: yup
        .string('Introduce tu nombre')
        .required('El nombre es obligatorio'),
    surname: yup
        .string('Introduce tus apellidos'),
    email: yup
        .string('Introduce tu correo')
        .email('Introduce un correo con un fromato valido')
        .required('El correo es obligatorio'),
    password: yup
        .string('Introduce tu contraseña')
        .required('La contraseña es obligatoria')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
            "La contrasena debe tener minimo 8 caracteres, una letra mayuscula, una letra minuscula,un numero y un caracter especial"
        ),
    confirm: yup
        .string('Confirma tu contraseña')
        .oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir')
        .required('Este campo es obligatorio'),
    messages: yup.bool()
});

const RegisterForm = () => {
    const navigate = useNavigate();
    const defaultTheme = createTheme();

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirm: '',
            messages: false
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try{
              request(
                "POST",
                "/register",
                {
                  name:values.name,
                  surname:values.surname,
                  email:values.email,
                  password:values.password,
                  messages:values.messages
              }
              ).then((response) => {
                setUserId(response.data.id)
                setAuthToken(response.data.token)
                navigate('/main')
                toast.success("Usuario Registrado Correctamente");
              }).catch((error) => {
                console.log(error)
              })              
            } catch(err) {
                console.log(err);
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
              Registrese
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
                <TextField
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    id="name"
                    name="name"
                    label="Nombre*"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    id="surname"
                    name="surname"
                    label="Apellidos"
                    value={formik.values.surname}
                    onChange={formik.handleChange}
                    error={formik.touched.surname && Boolean(formik.errors.surname)}
                    helperText={formik.touched.surname && formik.errors.surname}
                />
                <TextField
                    sx={{ marginBottom: '20px' }}
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
                    sx={{ marginBottom: '20px' }}
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
                <TextField
                    sx={{ marginBottom: '20px' }}
                    fullWidth
                    id="confirm"
                    name="confirm"
                    label="Confirmar Contraseña*"
                    type="password"
                    value={formik.values.confirm}
                    onChange={formik.handleChange}
                    error={formik.touched.confirm && Boolean(formik.errors.confirm)}
                    helperText={formik.touched.confirm && formik.errors.confirm}
                />
                <FormControlLabel
                    control={<Checkbox
                        value={formik.values.messages}
                        sx={{ color: "#8080ff", '&.Mui-checked': { color: "#8080ff", }, }}
                        onChange={(e) => {
                            const { checked } = e.target;
                            formik.setFieldValue('messages', checked);
                        }}
                    />}
                    label="Deseo recibir correos electrónicos todos los meses con resumenes de gastos" />
              <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" } }} fullWidth variant="contained" type="submit">
                    Registrarse
                </Button>
              <Grid container>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"¿Ya tiene una cuenta? Inicie Sesión"}
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

export default RegisterForm;
