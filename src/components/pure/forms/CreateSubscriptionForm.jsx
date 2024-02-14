import React from "react";
import { useFormik } from "formik";
import Button from "@mui/material/Button";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@mui/material";
import { Toaster, toast } from "sonner";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "../../../styles/Forms/Forms.css";
import { request } from "../../../service/axiosHelper";
import dayjs from "dayjs";

const CreateSubscriptionForm = ({ showModal, userId, folders }) => {
  const navigate = useNavigate();

  const allFolders = [];

  function extract(folder) {
    const { folderId, name, subfolders } = folder;
    allFolders.push({ folderId, name });

    if (subfolders.length > 0) {
      subfolders.forEach((subfolder) => {
        extract(subfolder);
      });
    }
  }

  folders.forEach((folder) => {
    extract(folder);
  });

  function parseDateString(value) {
    // Ensure that value is a string before attempting to split
    const dateString =
      typeof value === "string" ? value : value.format("DD/MM/YYYY");

    const parts = dateString.split("/");
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1; // Months are zero-based
    const year = parseInt(parts[2], 10);

    return dayjs(new Date(year, month, day));
  }

  const validationSchema = yup.object({
    name: yup
      .string("Introduce el nombre del servicio")
      .required("El nombre del servicio es obligatorio"),
    price: yup
      .number("Introduce el precio del servicio")
      .required("El precio es obligatorio"),
    contractDate: yup
      .date("Introduzca el dia que contrato el servicio")
      .max(new Date(), "No puede escoger fechas a futuro")
      .required("La fecha de contrato es obligatoria"),
    subscriptionFrequency: yup
      .number("Introduce la frecuencia de renovacion")
      .required("La frecuancia es obligatoria"),
    subscriptionUsername: yup.string(
      "Introduce el nombre de usuario que se usara en el servicio"
    ),
    subscriptionPassword: yup.string(
      "Introduce la contraseña que se usara en el servicio"
    ),
    subscriptionEmail: yup.string(
      "Introduce el email que se usara en el servicio"
    ),
    subscriptionComments: yup.string(
      "Introduce algún comentario acerca del servicio"
    ),
    lastDigitsBank: yup
      .string()
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(4, "El numero debe tener una longitud de 4 digitos")
      .max(4, "El numero debe tener una longitud de 4 digitos"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      contractDate: dayjs(),
      subscriptionFrequency: "",
      subscriptionUsername: "",
      subscriptionPassword: "",
      subscriptionEmail: "",
      subscriptionComments: "",
      lastDigitsBank: "",
      parentFolder: { folderId: null, name: "" },
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        request(
          "POST",
          "/users/" +
            userId +
            "/folders/" +
            values.parentFolder.folderId +
            "/subscriptions",
          {
            name: values.name,
            price: values.price,
            contractDate: values.contractDate,
            subscriptionFrequency: values.subscriptionFrequency,
            subscriptionUsername: values.subscriptionUsername,
            subscriptionPassword: values.subscriptionPassword,
            subscriptionEmail: values.subscriptionEmail,
            subscriptionComments: values.subscriptionComments,
            lastDigitsBank: values.lastDigitsBank,
          }
        )
          .then((response) => {
            showModal();
            navigate(0);
            toast.success("Subscripción añadida correctamente");
          })
          .catch((error) => {
            toast.error("No se ha podido añadir la suscripcion");
          });
      } catch (err) {
        alert(err);
      }
    },
  });

  return (
    <div className="form-background">
      <Toaster position="top-center" expand={false} richColors />
      <div className="form">
        <div className="form-content">
          <h1>Nueva Suscripcion</h1>
          <form
            className="in-form"
            onSubmit={formik.handleSubmit}
            autoComplete="off"
          >
            <h6>Servicio</h6>
            <hr />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="name"
              name="name"
              label="Servicio"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <h6>Periodo de Suscripcion</h6>
            <hr />
            <h6>Fecha de Contratacion de Suscripcion</h6>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  sx={{ marginBottom: "20px" }}
                  fullWidth
                  id="contractDate"
                  name="contractDate"
                  label="Fecha de contratacion"
                  format="DD/MM/YYYY"
                  value={formik.values.contractDate}
                  onChange={(value) => {
                    const parsedDate =
                      value !== null
                        ? parseDateString(value)
                        : formik.initialValues.contractDate;
                    formik.setFieldValue("contractDate", parsedDate);
                  }}
                  error={
                    formik.touched.contractDate &&
                    Boolean(formik.errors.contractDate)
                  }
                  helperText={
                    formik.touched.contractDate && formik.errors.contractDate
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
            <h6>Frecuencia Pago</h6>
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="subscriptionFrequency"
              name="subscriptionFrequency"
              label="Frecuencia de Pago (meses)"
              value={formik.values.subscriptionFrequency}
              onChange={formik.handleChange}
              error={
                formik.touched.subscriptionFrequency &&
                Boolean(formik.errors.subscriptionFrequency)
              }
              helperText={
                formik.touched.subscriptionFrequency &&
                formik.errors.subscriptionFrequency
              }
            />
            <h6>Importe de Suscripcion</h6>
            <hr />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="price"
              name="price"
              label="Precio"
              value={formik.values.price}
              onChange={formik.handleChange}
              error={formik.touched.price && Boolean(formik.errors.price)}
              helperText={formik.touched.price && formik.errors.price}
            />
            <h6>Informacion de la Suscripcion</h6>
            <hr />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="subscriptionUsername"
              name="subscriptionUsername"
              label="Nombre de Usuario"
              value={formik.values.subscriptionUsername}
              onChange={formik.handleChange}
              error={
                formik.touched.subscriptionUsername &&
                Boolean(formik.errors.subscriptionUsername)
              }
              helperText={
                formik.touched.subscriptionUsername &&
                formik.errors.subscriptionUsername
              }
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="subscriptionPassword"
              name="subscriptionPassword"
              label="Contraseña del servicio"
              value={formik.values.subscriptionPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.subscriptionPassword &&
                Boolean(formik.errors.subscriptionPassword)
              }
              helperText={
                formik.touched.subscriptionPassword &&
                formik.errors.subscriptionPassword
              }
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="subscriptionEmail"
              name="subscriptionEmail"
              label="Email del Servicio"
              value={formik.values.subscriptionEmail}
              onChange={formik.handleChange}
              error={
                formik.touched.subscriptionEmail &&
                Boolean(formik.errors.subscriptionEmail)
              }
              helperText={
                formik.touched.subscriptionEmail &&
                formik.errors.subscriptionEmail
              }
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="subscriptionComments"
              name="subscriptionComments"
              label="Comentarios acerca Servicio"
              value={formik.values.subscriptionCommentssubscriptionComments}
              onChange={formik.handleChange}
              error={
                formik.touched.subscriptionCommentssubscriptionComments &&
                Boolean(formik.errors.subscriptionCommentssubscriptionComments)
              }
              helperText={
                formik.touched.subscriptionCommentssubscriptionComments &&
                formik.errors.subscriptionCommentssubscriptionComments
              }
            />
            <TextField
              sx={{ marginBottom: "20px" }}
              fullWidth
              id="lastDigitsBank"
              name="lastDigitsBank"
              label="Ultimos 4 digitos de la cuenta bancaria"
              value={formik.values.lastDigitsBank}
              onChange={formik.handleChange}
              error={
                formik.touched.lastDigitsBank &&
                Boolean(formik.errors.lastDigitsBank)
              }
              helperText={
                formik.touched.lastDigitsBank && formik.errors.lastDigitsBank
              }
            />
            <h6>Gestion</h6>
            <hr />
            <Autocomplete
              id="parentFolderId"
              name="parentFolderId"
              options={allFolders}
              getOptionLabel={(option) => option.name}
              style={{ width: "300px" }}
              onChange={(e, value) => {
                formik.setFieldValue(
                  "parentFolder",
                  value !== null ? value : formik.initialValues.parentFolder
                );
                console.log(value)
              }}
              renderInput={(params) => (
                <TextField
                  label="Carpeta"
                  fullWidth
                  name="parentFolderId"
                  {...params}
                />
              )}
              sx={{ marginBottom: "20px" }}
            />
            <div>
              <Button
                sx={{
                  backgroundColor: "#8080ff",
                  ":hover": { backgroundColor: "#9a9ac4" },
                }}
                variant="contained"
                type="submit"
              >
                Crear Suscripción
              </Button>
              <Button
                onClick={() => showModal()}
                sx={{
                  backgroundColor: "#fff",
                  color: "#000",
                  marginLeft: "30px",
                  ":hover": { backgroundColor: "grey" },
                }}
                variant="contained"
              >
                Cerrar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubscriptionForm;
