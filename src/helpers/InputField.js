// import React from 'react';

// function InputField({ name, type = 'text', placeholder, formik, options }) {
//   return (
//     <div className="form-group">
//       {type === 'select' ? (
//         <select
//           id={name}
//           name={name}
//           {...formik.getFieldProps(name)}
//         >
//           {options?.map((opt) => (
//             <option key={opt} value={opt}>
//               {opt.replace('_', ' ').toUpperCase()}
//             </option>
//           ))}
//         </select>
//       ) : (
//         <input
//           id={name}
//           name={name}
//           type={type}
//           placeholder={placeholder}
//           {...formik.getFieldProps(name)}
//           autoComplete="off"
//         />
//       )}

//       {formik.touched[name] && formik.errors[name] && (
//         <small>
//           <div className="error-message">{formik.errors[name]}</div>
//         </small>
//       )}
//     </div>
//   );
// }

// export default InputField;
import React from 'react';

function InputField({ name, type = 'text', className, placeholder, formik, value, onChange, error, touched, dataBinding }) {
  const hasFormik = !!formik;

  const inputProps = hasFormik
    ? { ...formik.getFieldProps(name) }
    : { name, value, onChange };

  const showError = hasFormik
    ? formik.touched[name] && formik.errors[name]
    : touched && error;

  return (
    <div className={`form-group ${className}`}>
      {/* "form-group" */}
      <label  className="form-label">{placeholder}</label>
      {type === 'select' ? (
        <select class="form-select" id={name} {...inputProps}>
          {dataBinding.data?.map((opt) => (
            <option key={opt[dataBinding.keyField]} value={opt[dataBinding.valueField]}>
              {opt[dataBinding.valueField]}
              {/* {opt.replace('_', ' ').toUpperCase()} */}
            </option>
          ))}
        </select>
      ) : (
        <input class="form-control"
          id={name}
          type={type}
          placeholder={placeholder}
          {...inputProps}
          autoComplete="off"
        />
      )}
      {showError && (
        <small>
          <div className="error-message">{hasFormik ? formik.errors[name] : error}</div>
        </small>
      )}
    </div>
  );
}

export default InputField;
