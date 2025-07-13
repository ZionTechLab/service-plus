import React from 'react';

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

export default InputField;
