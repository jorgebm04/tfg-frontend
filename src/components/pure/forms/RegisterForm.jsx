import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import '../../../styles/RegisterForm.css'

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
                await axios.post("http://localhost:8080/user",{
                    name:values.name,
                    surname:values.surname,
                    email:values.email,
                    password:values.password,
                    messages:values.messages
                });
                alert("User Registration Successfully");
            } catch(err) {
                alert(err);
            }
            
        },
    });

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label>Los campos marcados con * son obligatorios</label>
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
                <div>
                <Button sx={{ backgroundColor: "#8080ff", ":hover":{backgroundColor:"#9a9ac4"}}} variant="contained"  type="submit">
                    Crear Cuenta
                </Button>
                <Button sx={{ backgroundColor: "#fff", color:"#000", marginLeft:"30px", ":hover":{backgroundColor:"grey"}}} variant="contained"  type="reset">
                    Reset
                </Button>
                </div>
                
            </form>
        </div>
    );
};

export default RegisterForm