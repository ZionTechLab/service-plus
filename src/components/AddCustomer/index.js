import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputField';
import { useNavigate } from 'react-router-dom';

const initialValues = {
  name: '',
  email: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

function AddCustomer() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const customers = JSON.parse(localStorage.getItem('customers')) || [];
      const newCustomer = { ...values, id: new Date().getTime() };
      customers.push(newCustomer);
      localStorage.setItem('customers', JSON.stringify(customers));
      resetForm();
      navigate('/main/add-customer');
    },
  });

  return (
    <div>
      <h1>Add Customer</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <InputField name="name" type="text" placeholder="Name" formik={formik} />
        <InputField name="email" type="email" placeholder="Email" formik={formik} />
        <button type="submit">Add Customer</button>
      </form>
    </div>
  );
}

export default AddCustomer;
