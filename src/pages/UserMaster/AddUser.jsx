import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormikBuilder } from '../../helpers/formikBuilder';
import InputField from '../../helpers/InputField';
import usePopupMessage from '../../components/PopupMessage';
import UserService from './UserService';

// Custom Image Input with Preview
function ImageInputField({ name, formik, className }) {
  const [preview, setPreview] = useState('');
  const handleChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue(name, file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };
  return (
    <div className={className || 'mb-3'}>
      <label className="form-label">Profile Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="form-control"
        style={{ display: 'none' }}
        id="profile_image_input"
      />
      <div
        className="image-preview mb-2"
        style={{
          width: 200,
          height: 200,
          border: '2px dashed #dee2e6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          background: '#f8f9fa',
          cursor: 'pointer',
        }}
        onClick={() => document.getElementById('profile_image_input').click()}
      >
        {preview ? (
          <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8 }} />
        ) : (
          <div className="image-preview-text text-center text-secondary">
            <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
            <div>Click to select image</div>
            <small>Choose your profile picture</small>
          </div>
        )}
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-danger small">{formik.errors[name]}</div>
      )}
    </div>
  );
}

const fields = {
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
    initialValue: "",
    validation: Yup.string().required("Username is required"),
    className: "col-md-6"
  },
  password_hash: {
    name: "password_hash",
    type: "password",
    placeholder: "Password",
    initialValue: "",
    validation: Yup.string().required("Password is required"),
    className: "col-md-6"
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    initialValue: "",
    validation: Yup.string().email("Invalid email").required("Email is required"),
    className: "col-md-12"
  },
  full_name: {
    name: "full_name",
    type: "text",
    placeholder: "Full Name",
    initialValue: "",
    validation: Yup.string().required("Full name is required")
  },
  phone: {
    name: "phone",
    type: "phone",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string(),
    className: "col-md-6"
  },
  phone2: {
    name: "phone2",
    type: "phone",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string(),
    className: "col-md-6"
  },
  profile_picture: {
    name: "profile_picture",
    type: "text",
    placeholder: "Profile Picture URL",
    initialValue: "",
    validation: Yup.string()
  },
  // New image field
  profile_image: {
    name: "profile_image",
    type: "file",
    placeholder: "Profile Image",
    initialValue: null,
    validation: Yup.mixed(),
    className: "col-md-12"
  },
  role: {
    name: "role",
    type: "text",
    placeholder: "Role",
    initialValue: "",
    validation: Yup.string().required("Role is required")
  },
  status: {
    name: "status",
    type: "text",
    placeholder: "Status",
    initialValue: "",
    validation: Yup.string()
  }
};

function AddUser() {
  const navigate = useNavigate();
  const [ConfirmationDialog, confirm] = usePopupMessage();

  const handleSubmit = (values, { resetForm }) => {
    // Convert image file to base64 if present
    if (values.profile_image) {
      const reader = new FileReader();
      reader.onload = () => {
        UserService.createUser({
          ...values,
          profile_picture: reader.result // store base64 string
        });
        confirm("User added successfully!").then(() => navigate('/user-master'));
        resetForm();
      };
      reader.readAsDataURL(values.profile_image);
    } else {
      UserService.createUser(values);
      confirm("User added successfully!").then(() => navigate('/user-master'));
      resetForm();
    }
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  return (
    <div className="container py-4">
      {ConfirmationDialog}
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <div className="row">
          {Object.keys(fields).map((key) =>
            key === "profile_image" ? (
              <ImageInputField
                key={key}
                name={fields[key].name}
                formik={formik}
                className={fields[key].className}
              />
            ) : (
              <InputField
                key={key}
                {...fields[key]}
                formik={formik}
                autocomplete="off"
              />
            )
          )}
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/user-master')}>Cancel</button>
      </form>
    </div>
  );
}

export default AddUser;
// ...existing code...