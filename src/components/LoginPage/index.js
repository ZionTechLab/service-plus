import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginSuccess } from "../../features/auth/authSlice";
import InputField from "../../helpers/InputField";
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

  return (
    <div className="LoginPage">
    <div className="container">
      <h1>Travel Assistant</h1>




      <form onSubmit={formik.handleSubmit} noValidate>


        <InputField {...fields.fullName} formik={formik} />
        <InputField {...fields.password} formik={formik} />
        <button className="form-control btn btn-primary" type="submit">SIGN IN</button>
      </form>
    </div>
   </div>
  );
}


export default LoginPage;
