import { useState, useEffect, useRef } from 'react';
import './ImageInputField.css';

// Custom Image Input with Preview
function ImageInputField({ name, formik, className, placeholder }) {
  const [preview, setPreview] = useState('');
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  // Keep local preview in sync when Formik value changes (supports File or string URL/dataURI)
  useEffect(() => {
    const val = formik?.values?.[name];
    if (!val) {
      setPreview('');
      if (inputRef.current) inputRef.current.value = '';
      return;
    }
    if (val instanceof File) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(val);
      return () => {
        try {
          if (reader && reader.readyState === 1) reader.abort();
        } catch (e) {
          // ignore
        }
      };
    }
    if (typeof val === 'string') {
      setPreview(val);
    }
  }, [formik, name]);
  const handleChange = (e) => {
    const file = e.target.files[0];
    formik.setFieldValue(name, file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setPreview(ev.target.result);
      reader.readAsDataURL(file);
    } else {
      setPreview('');
    }
  };
  return (
    <div className={className || 'mb-3'}>
      <label className="form-label">{placeholder}</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="form-control image-input-hidden"
        id="profile_image_input"
        ref={inputRef}
      />
      <div className="image-input-row">
        <div className={"image-preview mb-2" + (preview ? ' has-preview' : '')}
          onClick={() => {
            if (preview) {
              setShowModal(true);
            } else if (inputRef.current) {
              inputRef.current.click();
            }
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" className="" />
          ) : (
            <div className="image-preview-text text-center text-secondary">
              <i className="bi bi-image"></i>
              <div>Click to select image</div>
              {/* <small>Choose your profile picture</small> */}
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary ms-2 d-flex align-items-center justify-content-center image-upload-btn"
          onClick={() => inputRef.current && inputRef.current.click()}
          aria-label="Select File"
        >
          <i className="bi bi-upload"></i>
        </button>
      </div>
      {/* Modal for large image preview */}
      {showModal && preview && (
        <div className="image-modal-overlay" onClick={() => setShowModal(false)}>
          <img src={preview} alt="Large Preview" className="image-modal-img" onClick={e => e.stopPropagation()} />
          <button type="button" aria-label="Close" className="image-modal-close" onClick={() => setShowModal(false)}>
            &times;
          </button>
        </div>
      )}
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-danger small">{formik.errors[name]}</div>
      )}
    </div>
  );
}

export default ImageInputField;
