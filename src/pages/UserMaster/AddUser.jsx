
import {  useState,useEffect } from "react";
import {useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormikBuilder } from '../../helpers/formikBuilder';
import InputField from '../../helpers/InputField';
import ApiService from './UserService';
import MessageBoxService from "../../services/MessageBoxService";

function AddUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });

const fields = {
  id: {
    name: "id",
    type: "text",
    placeholder: "User Code",
    initialValue: "<Auto>",
    disabled: true,
    visible:false
  },
  userName: {
    name: "userName",
    type: "text",
    placeholder: "User ID",
    initialValue: "",
    validation: Yup.string().required("User ID is required"),
    className: "col-md-3 col-sm-6 col-6"
  },
  password: {
    name: "password",
    type: "password",
    placeholder: "Password",
    initialValue: "",
    validation: Yup.string().required("Password is required"),
    className: "col-md-3 col-sm-6 col-6"
  },  
  fullName: {
    name: "fullName",
    type: "text",
    placeholder: "Full Name",
    initialValue: "",
    validation: Yup.string().required("Full name is required"),
    className: "col-md-6 col-sm-6 col-12"
  },
  email: {
    name: "email",
    type: "email",
    placeholder: "Email",
    initialValue: "",
    validation: Yup.string().email("Invalid email").required("Email is required"),
    className: "col-md-6 col-sm-6 col-12"
  },
  phone: {
    name: "phone",
    type: "phone",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string(),
    className: "col-md-3 col-sm-6 col-6"
  },
  phone2: {
    name: "phone2",
    type: "phone",
    placeholder: "Phone",
    initialValue: "",
    validation: Yup.string(),
    className: "col-md-3 col-sm-6 col-6"
  },
  roleId: {
    name: "roleId",
    type: "select",
    placeholder: "Role",
     dataBinding: {
         data: uiData.data.Role,
        keyField: "id",
        valueField: "roleName",
      },
    validation: Yup.string().required("Role is required"),
    className: "col-md-3 col-sm-6 col-6"
  },
  active: {
    name: "active",
    type: "switch",
    initialValue: true,
    validation: Yup.boolean(),
    placeholder: "Active",
  },
};

  useEffect(() => {
   const fetchUi = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: {} }));
      const data = await ApiService.getUi();
      setUiData(prev => ({ ...prev, ...data , loading: false }));
    };
    fetchUi();

    if (id) {
      const fetchTxn = async () => {
        const response = await ApiService.get(id);
        if (response.success) {
          if (response.data) {
            formik.setValues({ ...response.data});
          }
        }
      };
      fetchTxn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const param = { 
      header: { ...values , id: parseInt(id ? id : 0)}, 
      isUpdate:id ? true : false
    };
    const response = await ApiService.update({ ...param });

    if (response.success) {
      MessageBoxService.show({
        message: "User saved successfully!",
        type: "success",
        onClose: () => navigate("/user-master"),
      });
      resetForm();
    }
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  return (
    <div className="container p-3">
      <form onSubmit={formik.handleSubmit} className=" g-3">
        <div className="row g-2">
          {Object.keys(fields).map((key) => (
              <InputField
                key={key}
                {...fields[key]}
                formik={formik}
                autocomplete="off"
              />
            )
          )}
        </div>
        <button type="submit" className="w-100 btn btn-primary mt-3">Submit</button>

      </form>
    </div>
  );
}

export default AddUser;