import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginSuccess } from "../../features/auth/authSlice";
import InputField from "../InputField";
import "./LoginPage.css";
import {useFormikBuilder} from "../../helpers/formikBuilder";

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

// const initialValues = Object.fromEntries(
//   Object.entries(fields).map(([key, field]) => [key, field.initialValue])
// );
// const validationSchema = Yup.object(
//   Object.fromEntries(
//     Object.entries(fields).map(([key, field]) => [key, field.validation])
//   )
// );

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

 const handleInquirySubmit = (values) => {
      const userData = { name: values.fullName, id: "123" };
      if(userData.name === "voyaadmin" && values.password === "voya@admin") 

      dispatch(loginSuccess(userData));
      navigate("/main/travel-assistant", { replace: true });
    };

    const formik = useFormikBuilder(fields, handleInquirySubmit);
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema,
  //   onSubmit: (values) => {
  //     const userData = { name: values.fullName, id: "123" };
  //     if(userData.name === "voyaadmin" && values.password === "voya@admin") 

  //     dispatch(loginSuccess(userData));
  //     navigate("/main/travel-assistant", { replace: true });
  //   },
  // });

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


export default LoginPage;
