import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputField from '../InputField';
import './ServiceInquiry.css';

const inquiryTypes = {
  QUOTATION: 'quotation',
  TECHNICAL_SUPPORT: 'technical_support',
  COMPLAIN: 'complain',
  REPAIR: 'repair',
  NEW_ORDER: 'new_order',
};

const priorities = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
};

const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  serviceType: inquiryTypes.QUOTATION,
  priority: priorities.MEDIUM,
  subject: '',
  message: '',
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
});

function ServiceInquiry() {
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="ServiceInquiry">
      <div className="container">
        <h1>Service Inquiry</h1>
        <form onSubmit={formik.handleSubmit} noValidate>
          <InputField name="firstName" type="text" placeholder="First Name" formik={formik} />
          <InputField name="lastName" type="text" placeholder="Last Name" formik={formik} />
          <InputField name="email" type="email" placeholder="Email" formik={formik} />
          <InputField name="phone" type="tel" placeholder="Phone" formik={formik} />
          <div className="form-group">
            <select
              id="serviceType"
              name="serviceType"
              {...formik.getFieldProps('serviceType')}
            >
              {Object.values(inquiryTypes).map((type) => (
                <option key={type} value={type}>
                  {type.replace('_', ' ').toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <select
              id="priority"
              name="priority"
              {...formik.getFieldProps('priority')}
            >
              {Object.values(priorities).map((priority) => (
                <option key={priority} value={priority}>
                  {priority.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          <InputField name="subject" type="text" placeholder="Subject" formik={formik} />
          <InputField name="message" type="text" placeholder="Message" formik={formik} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ServiceInquiry;
