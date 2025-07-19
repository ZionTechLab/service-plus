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
  dataBinding,children
}) {
  const hasFormik = !!formik;

  const inputProps = hasFormik
    ? { ...formik.getFieldProps(name) }
    : { name, value, onChange };

  const showError = hasFormik
    ? formik.touched[name] && formik.errors[name]
    : touched && error;

  const handleKeyDownNumber = (e) => {
    const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
    if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
      e.preventDefault();
    }
  };

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select className="form-select" id={name} {...inputProps}>
          {dataBinding?.data?.map((opt) => (
            <option key={opt[dataBinding.keyField]} value={opt[dataBinding.valueField]}>
              {opt[dataBinding.valueField]}
            </option>
          ))}
        </select>
      );
    }

    if (type === 'textarea') {
      return (
        <textarea
          className="form-control"
          id={name}
          placeholder={placeholder}
          {...inputProps}
          autoComplete="off"
          rows={4}
        />
      );
    }

    if (type === 'number') {
      return (
        <input
          className="form-control"
          id={name}
          type="text" // keep spinner away
          placeholder={placeholder}
          {...inputProps}
          autoComplete="off"
          onKeyDown={handleKeyDownNumber}
        />
      );
    }
    if (type === 'checkbox') {
      return (  <div className="form-check form-switch ">
          {/* <input className="form-check-input" type="checkbox" role="switch" id="switchCheckDefault"/> */}
         <input
          className="form-check-input"
          id={name}
          type="checkbox" role="switch"// keep spinner away
          // placeholder={placeholder}
          {...inputProps}
            checked={inputProps.value}
          // autoComplete="off"
          // onKeyDown={handleKeyDownNumber}
        />
         {/* <label className="form-check-label" htmlFor="switchCheckDefault">{placeholder}</label> */}
        </div>
      );
    }
    // Default input
    return (
      <input
        className="form-control"
        id={name}
        type={type}
        placeholder={placeholder}
        {...inputProps}
      
        autoComplete="off"
      />
    );
  };

  return (
    <div className={`form-group ${className}`}>
      <label className="form-label">{placeholder}</label>
            <div className="input-group">
      {renderInput()}{children}</div>
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
