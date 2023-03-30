import React from 'react';
import '../../../styles/CreateSubscriptionForm.css';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import { parse, isDate } from "date-fns";
import TextField from '@mui/material/TextField';
import axios from 'axios';

const CreateSubscriptionForm = ({ showModal,userId,updateList }) => {

    function parseDateString(value, originalValue) {
        const parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "dd/MM/yyyy", new Date());

        return parsedDate;
    }

    const validationSchema = yup.object({
        name: yup
            .string('Introduce el nombre del servicio')
            .required('El nombre del servicio es obligatorio'),
        price: yup
            .number('Introduce el precio del servicio')
            .required('El precio es obligatorio'),
        contractDate: yup
            .date('Introduzca el dia que contrato el servicio')
            .transform(parseDateString)
            .max(new Date(), 'No puede escoger fechas a futuro')
            .required('La fecha de contrato es obligatoria')
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            contractDate: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await axios.post("http://localhost:8080/users/"+userId+"/subscription", {
                    name: values.name,
                    price: values.price,
                    contractDate: values.contractDate
                })
                await updateList({values})
                showModal()
            } catch (err) {
                alert(err);
            }
        }
    })

    return (
        <div className="form-background">
            <div className="form">
                <div className="form-content">
                    <h1>Nueva Suscripcion</h1>
                    <form className='in-form' onSubmit={formik.handleSubmit}>
                        <TextField
                            sx={{ marginBottom: '20px' }}
                            fullWidth
                            id="name"
                            name="name"
                            label="Servicio"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            sx={{ marginBottom: '20px' }}
                            fullWidth
                            id="price"
                            name="price"
                            label="Precio"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            sx={{ marginBottom: '20px' }}
                            fullWidth
                            id="contractDate"
                            name="contractDate"
                            label="Fecha de Contrato"
                            value={formik.values.contractDate}
                            onChange={formik.handleChange}
                            error={formik.touched.contractDate && Boolean(formik.errors.contractDate)}
                            helperText={formik.touched.contractDate && formik.errors.contractDate}
                        />
                        <div>
                            <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" } }} variant="contained" type="submit">
                                Añadir servicio
                            </Button>
                            <div className='buttons'>
                                <Button sx={{ backgroundColor: "#fff", color: "#000", marginLeft: "0px", ":hover": { backgroundColor: "grey" } }} variant="contained" type="reset">
                                    Reset
                                </Button>
                                <Button onClick={() => showModal()} sx={{ backgroundColor: "#fff", color: "#000", marginLeft: "30px", ":hover": { backgroundColor: "grey" } }} variant="contained">Cerrar</Button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateSubscriptionForm;
