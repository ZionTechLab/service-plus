import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginSuccess } from "../../features/auth/authSlice";
import "./LoginPage.css";

const fields = {
  fullName: {
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
    initialValue: "",
    validation: Yup.string()
      .min(2, "Must be at least 2 characters")
      .matches(/^[a-zA-Z\s]*$/, "Only letters and spaces are allowed")
      .required("Full Name is required"),
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
    initialValue: "",
    validation: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  },
};

const initialValues = {
  fullName: fields.fullName.initialValue,
  password: fields.password.initialValue,
};

const validationSchema = Yup.object({
  fullName: fields.fullName.validation,
  password: fields.password.validation,
});

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const userData = { name: values.fullName, id: "123" };
      if(userData.name === "voyaadmin" && values.password === "voya@admin") 

      dispatch(loginSuccess(userData));
      navigate("/main/travel-assistant", { replace: true });
    },
  });

  return (
    <div className="LoginPage">
    <div className="container">
      <h1>Travel Assistant</h1>
      <form onSubmit={formik.handleSubmit} noValidate>
        <InputField {...fields.fullName} formik={formik} />
        <InputField {...fields.password} formik={formik} />
        <button type="submit">SIGN IN</button>
      </form>
    </div>
   </div>
  );
}

function InputField({ name, type, placeholder, formik }) {
  return (
    <div className="form-group">
      <input
        id={name}
        name={name}
        type={type}
        className="login-input"
        placeholder={placeholder}
        {...formik.getFieldProps(name)}
        autoComplete="off"
      />
      {formik.touched[name] && formik.errors[name] && (
      <small> <div className="error-message">{formik.errors[name]}</div></small> 
      )}
    </div>
  );
}

export default LoginPage;
