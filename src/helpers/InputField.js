import React from 'react';

function InputField({
  name,
  type = 'text',
  className,
  placeholder,
  formik,
  value,
  onChange,
  error,
  touched,
  dataBinding
}) {
  const hasFormik = !!formik;

  const inputProps = hasFormik
    ? { ...formik.getFieldProps(name) }
    : { name, value, onChange };

  const showError = hasFormik
    ? formik.touched[name] && formik.errors[name]
    : touched && error;

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label">{placeholder}</label>

      {type === 'select' ? (
        <select className="form-select" id={name} {...inputProps}>
          {dataBinding?.data?.map((opt) => (
            <option key={opt[dataBinding.keyField]} value={opt[dataBinding.valueField]}>
              {opt[dataBinding.valueField]}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <textarea
          className="form-control"
          id={name}
          placeholder={placeholder}
          {...inputProps}
          autoComplete="off"
          rows={4}
        />
      ) : (
        <input
          className="form-control"
          id={name}
          type={type}
          placeholder={placeholder}
          {...inputProps}
          autoComplete="off"
        />
      )}

      {showError && (
        <small>
          <div className="error-message">
            {hasFormik ? formik.errors[name] : error}
          </div>
        </small>
      )}
    </div>
  );
}

export default InputField;
