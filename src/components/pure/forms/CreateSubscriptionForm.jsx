import React from 'react';
import '../../../styles/CreateSubscriptionForm.css';
import { useFormik } from 'formik';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import  Button  from '@mui/material/Button';

const CreateSubscriptionForm = ({ showModal }) => {

    const formik = useFormik({
        initialValues: {
            name: '',
            surname: '',
            email: '',
            password: '',
            confirm: '',
            summary: false
        },
        onSubmit: async (values) => {
            await new Promise((r) => setTimeout(r, 1000))
            alert(JSON.stringify(values, null, 2));
        }
    })

    return (
        <div className="form-background">
            <div className="form">
                <div className="form-content">
                    <h1>Nueva Suscripcion</h1>
                    <form onSubmit={formik.handleSubmit}>
                        <label>Servicios</label>
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={['Netflix', 'HBO', 'Spotify']}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Servicio" />}
                        />
                        <TextField
                            sx={{ marginBottom: '20px' }}

                            id="other"
                            name="other"
                            label="Otro*"
                        />
                        <div>
                            <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" } }} variant="contained" type="submit">
                                Crear Cuenta
                            </Button>
                            <Button sx={{ backgroundColor: "#fff", color: "#000", marginLeft: "30px", ":hover": { backgroundColor: "grey" } }} variant="contained" type="reset">
                                Reset
                            </Button>
                            <Button onClick={() => showModal()} sx={{ backgroundColor: "#fff", color: "#000", marginLeft: "30px", ":hover": { backgroundColor: "grey" } }} variant="contained">Cerrar</Button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateSubscriptionForm;
