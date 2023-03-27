import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import '../../../styles/LoginForm.css'
import { useNavigate } from 'react-router-dom'


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

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 1000))
            alert(JSON.stringify(values, null, 2));
            localStorage.setItem('credentials',formik.values)
            navigate('/suscription')
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
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
                
                <Button sx={{ backgroundColor: "#8080ff", ":hover":{backgroundColor:"#9a9ac4"}}} fullWidth variant="contained"  type="submit">
                    Iniciar Sesion
                </Button>

                
            </form>
        </div>
    );
}

export default LoginForm;
