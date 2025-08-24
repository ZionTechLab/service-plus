import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { loginSuccess } from "../features/auth/authSlice";
import InputField from "../helpers/InputField";
import { useFormikBuilder } from "../helpers/formikBuilder";

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
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  },
};

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInquirySubmit = (values) => {
    const userData = { name: values.fullName, id: "123" };
    if (values.fullName === "admin" && values.password === "admin") {
      dispatch(loginSuccess(userData));
      navigate("/", { replace: true });
    } else {
      // Handle invalid credentials
      alert("Invalid credentials. Use admin/admin to login.");
    }
  };

  const formik = useFormikBuilder(fields, handleInquirySubmit);

  return (
    <div className="LoginPage">
      <div className="container">
        <div className="py-5 text-center">
          <h1 className="h2">Log In</h1>
        </div>
        <div className="row g-5 justify-content-center">
          <div className="col-md-5 ">
            <form onSubmit={formik.handleSubmit} noValidate>
              <InputField {...fields.fullName} formik={formik} />
              <InputField {...fields.password} formik={formik} />
              <button
                className="form-control btn btn-primary mt-5"
                type="submit"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
