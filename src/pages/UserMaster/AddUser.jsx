import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormikBuilder } from '../../helpers/formikBuilder';
import InputField from '../../helpers/InputField';
import usePopupMessage from '../../components/PopupMessage';
import UserService from './UserService';

const fields = {
  username: {
    name: "username",
    type: "text",
    placeholder: "Username",
    initialValue: "",
    validation: Yup.string().required("Username is required")
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    initialValue: "",
    validation: Yup.string().email("Invalid email").required("Email is required")
  },
  password_hash: {
    name: "password_hash",
    type: "password",
    placeholder: "Password",
    initialValue: "",
    validation: Yup.string().required("Password is required")
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
    type: "text",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string()
  },
  profile_picture: {
    name: "profile_picture",
    type: "text",
    placeholder: "Profile Picture URL",
    initialValue: "",
    validation: Yup.string()
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
    UserService.createUser(values);
    confirm("User added successfully!").then(() => navigate('/user-master'));
    resetForm();
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  return (
    <div className="container py-4">
      {ConfirmationDialog}
      <h3>Add User</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {Object.keys(fields).map((key) => (
            <div className="col-md-6 mb-3" key={key}>
              <InputField {...fields[key]} formik={formik} />
            </div>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate('/user-master')}>Cancel</button>
      </form>
    </div>
  );
}

export default AddUser;
