import React from 'react';
import './InputField.css';
// import InputMask from 'react-input-mask';

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
  dataBinding,children,disabled,
  labelOnTop=true
}) {

  const hasFormik = !!formik;

  const inputProps = hasFormik
    ? { ...formik.getFieldProps(name) }
    : { name, value, onChange };

  const showError = hasFormik
    ? formik.touched[name] && formik.errors[name]
    : touched && error;

  // const handleKeyDownNumber = (e) => {
  //   const allowed = ['Backspace', 'ArrowLeft', 'ArrowRight', 'Tab', 'Delete'];
  //   if (!/[0-9]/.test(e.key) && !allowed.includes(e.key)) {
  //     e.preventDefault();
  //   }
  // };

  // Custom phone mask formatter
  const formatPhone = (value) => {
    const str = typeof value === 'string' ? value : (value ? String(value) : '');
    if (!str) return '';
    // Remove all non-digit chars
    const digits = str.replace(/\D/g, '').slice(0, 10);
    const len = digits.length;
    if (len === 0) return '';
    if (len < 4) return `(${digits}`;
    if (len < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  // Custom onChange for phone
  const handlePhoneChange = (e) => {
    const raw = e.target.value;
    const formatted = formatPhone(raw);
    if (hasFormik) {
      formik.setFieldValue(name, formatted);
    } else if (onChange) {
      // Simulate a normal event for non-Formik
      onChange({ target: { name, value: formatted } });
    }
  };

  // Format amount as currency (no symbol, 2 decimals, no commas for input)
  const formatAmount = (val) => {
    if (val === undefined || val === null || val === '') return '';
    // Remove all non-numeric except dot
    let cleaned = String(val).replace(/[^\d.]/g, '');
    // Only allow one dot
    const parts = cleaned.split('.');
    if (parts.length > 2) cleaned = parts[0] + '.' + parts.slice(1).join('');
    // Limit to 2 decimals
    if (cleaned.includes('.')) {
      const [intPart, decPart] = cleaned.split('.');
      cleaned = intPart + '.' + decPart.slice(0, 2);

    }
       cleaned = cleaned.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return cleaned;
  };

  // Custom onChange for amount
  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/,/g, "");
    // const formatted = formatAmount(raw);
    if (hasFormik) {
      formik.setFieldValue(name, raw);
    } else if (onChange) {
      onChange({ target: { name, value: raw } });
    }
  };

  const renderInput = () => {
    if (type === 'select') {
      return (
        <select className="form-select" id={name} {...inputProps} >
          {dataBinding?.data?.map((opt) => (
            <option key={opt[dataBinding.keyField]} value={opt[dataBinding.keyField]}>
              {opt[dataBinding.keyField]} | {opt[dataBinding.valueField]}
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

    if (type === 'phone') {
      // Use value from Formik or prop
      const phoneValue = hasFormik ? formik.values[name] : value;
      return (
        <input
          className="form-control"
          id={name}
          type="text"
          placeholder={placeholder || '(123) 456-7890'}
          name={name}
          value={formatPhone(phoneValue)}
          onChange={handlePhoneChange}
          autoComplete="off"
          disabled={disabled}
          maxLength={14}
        />
      );
    }

    if (type === 'amount') {
      // Use value from Formik or prop
      const amountValue = hasFormik ? formik.values[name] : value;
      return (
        <input
          className="form-control text-end"
          id={name}
          type="text"
          placeholder={placeholder || '0.00'}
          name={name}
          value={formatAmount(amountValue)}
          onChange={handleAmountChange}
          autoComplete="off"
          disabled={disabled}
          inputMode="decimal"
          maxLength={16}
        />
      );
    }

    if (type === 'number') {
      return (
        <input
          className="form-control"
          id={name}
          type="number"
          placeholder={placeholder}
          {...inputProps}
          autoComplete="off"
          // onKeyDown={handleKeyDownNumber}
          disabled={disabled}
        />
      );
    }
    if (type === 'switch') {
      return (  <div className="form-check form-switch ">
         <input
          className="form-check-input"
          id={name}
          type="checkbox" role="switch"// keep spinner away
          {...inputProps}
            checked={inputProps.value}
        />
        {inputProps.value}
        </div>
      );
    }  
      if (type === 'checkbox') {
      return (  <div className="form-check  ">
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
      // readOnly
     disabled={disabled}
        autoComplete="off"
      />
    );
  };

  if (type === 'checkbox' ) {
    return (
      <div className={`form-group d-flex align-items-center gap-2 checkbox-custom ${className}`}>
      <div className="input-group flex-nowrap ">
        {renderInput()}
        <label className="form-label mb-0 ms-2 ">{placeholder}</label>
      </div>
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

  // Default return for other types
  return (
    <div className={`form-group ${className}`}>
    {labelOnTop &&(<label className="form-label">{placeholder}</label>)}  
      <div className="input-group">
            {!labelOnTop &&(<label className="form-label ">{placeholder}</label>)} 
        {renderInput()}
        {children}
      </div>
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
