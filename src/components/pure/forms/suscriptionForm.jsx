import React, {useRef} from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';
import { Suscription } from '../../../models/suscription.class';


const loginSchema = Yup.object().shape(
    {
        name: Yup.string()
            .required('Name is required'),
        price: Yup.number()
            .required('Price is required'),
        payDate: Yup.date()
            // .required("Date is required")
    }
);

const SuscriptionForm = ({add}) => {
    const initialCredentials = {
        name: '',
        price: '',
        payDate:''
    }

    const nameRef = useRef('');
    const priceRef = useRef('')
    const payDateRef = useRef('')

    function addTask(e){
        e.preventDefault()
        const newSuscription = new Suscription(
            nameRef.current.value,
            priceRef.current.value,
            payDateRef.current.value);
        add(newSuscription)
    }

    return (
        <div>
            <h4>Login Form</h4>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    await new Promise((r) => addTask);
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form>
                        <label htmlFor="name">Name</label>
                        <Field id="name" name="email" type="text" placeholder="suscription name" />
                        <ErrorMessage name="name"/>
                        <label htmlFor="price">Price</label>
                        <Field
                            id="price"
                            name="price"
                            placeholder="$"
                            type="text"
                        />
                        <ErrorMessage name="price"/>
                        <label htmlFor="payDate">Pay Date</label>
                        <Field id="payDate" name="payDate" type="text" placeholder="dd/mm/yyyy" />
                        <ErrorMessage name="payDate"/>
                        <button type="submit">Submit</button>
                        {isSubmitting ? (<p>Login your credentials...</p>) : null}
                    </Form>
                )}
            </Formik>
        </div>
    );
}

SuscriptionForm.propTypes = {
    add: PropTypes.func.isRequired
}

export default SuscriptionForm;
