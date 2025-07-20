import * as Yup from 'yup';
import InputField from '../helpers/InputField';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useFormikBuilder } from '../helpers/formikBuilder';
import PartnerService from '../components/AddCustomer/PartnerService';

const fields = {
  partnerCode: {
    name: 'partnerCode',
    type: 'text',
    placeholder: 'Partner Code',
    initialValue: '',
    validation: Yup.string().required('Partner Code is required'),
  },
  partnerName: {
    name: 'partnerName',
    type: 'text',
    placeholder: 'Partner Name',
    initialValue: '',
    validation: Yup.string().required('Partner Name is required'),
  },
  contactPerson: {
    name: 'contactPerson',
    type: 'text',
    placeholder: 'Contact Person',
    initialValue: '',
    validation: Yup.string().required('Contact Person is required'),
  },
  email: {
    name: 'email',
    type: 'email',
    placeholder: 'Email',
    initialValue: '',
    validation: Yup.string().email('Invalid email address').required('Email is required'),
  },
  address: {
    name: 'address',
    type: 'text',
    placeholder: 'Address',
    initialValue: '',
    validation: Yup.string().required('Address is required'),
  },
  phone: {
    name: 'phone',
    type: 'text',
    placeholder: 'Phone',
    initialValue: '',
    validation: Yup.string().required('Phone number is required'),
  },
  isCustomer: {
    name: 'isCustomer',
    type: 'checkbox',
    initialValue: false,
    validation: Yup.boolean(),
    placeholder: 'Customer',
  },
};

function AddCustomer() {
  // ...existing code...
  // This is a stub. Please add form logic as needed.
  return <div>Add Customer Page</div>;
}

export default AddCustomer;
