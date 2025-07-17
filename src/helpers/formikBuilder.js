import { useFormik } from "formik";
import * as Yup from "yup";


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
