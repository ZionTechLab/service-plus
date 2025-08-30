import { useFormik } from "formik";
import * as Yup from "yup";
import InputField from "./InputField";
import SelectedBusinessPartnerBox from "../pages/BusinessPartners/select-bp";


export const useFormikBuilder = (fields,handleInquirySubmit) => {
  return useFormik({
    initialValues:Object.fromEntries(
  Object.entries(fields).map(([key, field]) => [key, field.initialValue])
),
    validationSchema:Yup.object(
  Object.fromEntries(
    Object.entries(fields).map(([key, field]) => [key, field.validation])
  )
),
    onSubmit: handleInquirySubmit,
  });
};

// Generic renderer for a fields config created for useFormikBuilder
// - Renders InputField by default
// - Allows overriding by field.type via components map
// - Passes through className and formik
export const FieldsRenderer = ({ fields, formik, components = {}, inputProps = {} }) => {
  if (!fields) return null;
  return (
    <>
      {Object.keys(fields).map((key) => {
        const field = fields[key];
        // Built-in support for partner-select
        if(field?.type === 'br') {
          return (<div style={{height: '0px'}}><br/></div>  );
        }
        if (field?.type === 'partner-select') {
          return (
            <SelectedBusinessPartnerBox
              key={field.name || key}
              field={field}
              formik={formik}
              className={field.className}
            />
          );
        }
        const Custom = components[field?.type];
        if (Custom) {
          return (
            <Custom
              key={field.name || key}
              field={field}
              formik={formik}
              className={field.className}
            />
          );
        }
        return (
          <InputField
            key={field.name || key}
            {...field}
            formik={formik}
            {...inputProps}
          />
        );
      })}
    </>
  );
};
