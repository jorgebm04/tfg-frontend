import React from 'react';
// import '../../../styles/forms/CreateSubscriptionForm.css';
import { useFormik } from 'formik';
import Button from '@mui/material/Button';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom'
import { Autocomplete } from '@mui/material';
import { Toaster, toast } from 'sonner'
import '../../../styles/Forms/Forms.css'
import { request } from '../../../service/axiosHelper';


const CreateFolderForm = ({ showModal, userId, folders }) => {

    const navigate = useNavigate()

    const validationSchema = yup.object({
        name: yup
            .string('Introduce el nombre de la carpeta')
            .required('El nombre de la carpeta es obligatorio'),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            parentFolder: { id: null, name: "" }
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                request(
                    "POST",
                    "/users/" + userId + "/folders",
                    {
                        name: values.name,
                        parentFolderId: values.parentFolder.id
                    }
                ).then((response) => {
                    toast.success('Carpeta añadida correctamente')
                    showModal()
                    navigate(0)
                }).catch((error) => {
                    toast.error('No se ha podido añadir la carpeta')
                })
                
            } catch (err) {
                alert(err);
            }
        }
    })

    return (
        <div>
            <Toaster position="top-center" expand={false} richColors  />
            <div className="form-background">
                <div className="form">
                    <div className="form-content">
                        <h1>Nueva Carpeta</h1>
                        <form className='in-form' onSubmit={formik.handleSubmit}>
                            <TextField
                                sx={{ marginBottom: '20px' }}
                                fullWidth
                                id="name"
                                name="name"
                                label="Nombre Carpeta"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                error={formik.touched.name && Boolean(formik.errors.name)}
                                helperText={formik.touched.name && formik.errors.name}
                            />
                            <Autocomplete
                                id='parentFolderId'
                                name='parentFolderId'
                                options={folders}
                                getOptionLabel={option => option.name}
                                style={{ width: '300px' }}
                                onChange={(e, value) => {
                                    formik.setFieldValue("parentFolder",
                                        value !== null ? value : formik.initialValues.parentFolder)
                                }}
                                renderInput={params => (
                                    <TextField
                                        label="Carpeta Padre"
                                        fullWidth
                                        name="parentFolderId"
                                        {...params}
                                    />
                                )}
                                sx={{marginBottom:'20px'}}
                            />

                            <div>
                                <Button sx={{ backgroundColor: "#8080ff", ":hover": { backgroundColor: "#9a9ac4" } }} variant="contained" type="submit">
                                    Añadir Carpeta
                                </Button>
                                <Button onClick={() => showModal()} sx={{ backgroundColor: "#fff", color: "#000", marginLeft: "30px", ":hover": { backgroundColor: "grey" } }} variant="contained">Cerrar</Button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFolderForm;
