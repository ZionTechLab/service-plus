// import React from 'react';

// function InputField({ name, type, placeholder, formik }) {
//   return (
//     <div className="form-group">
//       <input
//         id={name}
//         name={name}
//         type={type}
//         placeholder={placeholder}
//         {...formik.getFieldProps(name)}
//         autoComplete="off"
//       />
//       {formik.touched[name] && formik.errors[name] && (
//       <small> <div className="error-message">{formik.errors[name]}</div></small>
//       )}
//     </div>
//   );
// }

// export default InputField;


import React from 'react';

function InputField({ name, type = 'text', placeholder, formik, options }) {
  return (
    <div className="form-group">
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          {...formik.getFieldProps(name)}
        >
          {options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt.replace('_', ' ').toUpperCase()}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          {...formik.getFieldProps(name)}
          autoComplete="off"
        />
      )}

      {formik.touched[name] && formik.errors[name] && (
        <small>
          <div className="error-message">{formik.errors[name]}</div>
        </small>
      )}
    </div>
  );
}

export default InputField;
