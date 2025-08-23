
import {  useState,useEffect } from "react";
import {useParams, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormikBuilder } from '../../helpers/formikBuilder';
import InputField from '../../helpers/InputField';
import ApiService from './RefferanceService';
import MessageBoxService from "../../services/MessageBoxService";
import transformDateFields from "../../helpers/transformDateFields";

function AddRefferances() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uiData, setUiData] = useState({loading: false, success: false, error: '', data: {} });
const categoryType = 70;

const fields = {
  id: {
    name: "id",
    type: "text",
    placeholder: "User Code",
    initialValue: "<Auto>",
    disabled: true,
    // visible:false
  },
  value: {
    name: "value",
    type: "text",
    placeholder: uiData.data.meta?.metaValue,
    initialValue: "",
    validation: Yup.string().required(`${uiData.data.meta?.metaValue} is required`),
    className: "col-md-3 col-sm-6 col-12"
  },
  description: {
    name: "description",
    type: "textarea",
    placeholder: uiData.data.meta?.metaDesc,
    initialValue: "",
    validation: Yup.string().required(`${uiData.data.meta?.metaDesc} is required`),
    className: "col-12"
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
    console.log("Fetching UI data...");
   const fetchUi = async () => {
      setUiData(prev => ({ ...prev, loading: true, error: '', data: {} }));
      const data = await ApiService.getUi({ categoryType });
      setUiData(prev => ({ ...prev, ...data , loading: false }));
      console.log("UI data fetched:", data);
    };
    fetchUi();

    if (id) {
      const fetchTxn = async () => {
        const response = await ApiService.get(id,categoryType);
        if (response.success) {
          if (response.data) {
              const normalized = transformDateFields(response.data, fields);
            formik.setValues({ ...normalized });
          }
        }
      };
      fetchTxn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (values, { resetForm }) => {
    const param = { 
      header: { ...values , id: parseInt(id ? id : 0), categoryType }, 
      isUpdate:id ? true : false
    };
    const response = await ApiService.update({ ...param });

    if (response.success) {
      MessageBoxService.show({
        message: "User saved successfully!",
        type: "success",
        onClose: () => navigate("/refferance"),
      });
      resetForm();
    }
  };

  const formik = useFormikBuilder(fields, handleSubmit);

  return (
    <div className="container p-3">
      <form onSubmit={formik.handleSubmit} className=" g-3">
          <div className="card mb-3">

            <div className="card-body">
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
</div></div>
      </form>
    </div>
  );
}

export default AddRefferances;