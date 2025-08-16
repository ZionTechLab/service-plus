import { useState, useEffect, useRef } from 'react';

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
        className="form-control"
        style={{ display: 'none' }}
        id="profile_image_input"
        ref={inputRef}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          className="image-preview mb-2"
          style={{
            width: 200,
            height: 200,
            border: '2px dashed #dee2e6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8,
            background: '#f8f9fa',
            cursor: preview ? 'zoom-in' : 'pointer',
          }}
          onClick={() => {
            if (preview) {
              setShowModal(true);
            } else if (inputRef.current) {
              inputRef.current.click();
            }
          }}
        >
          {preview ? (
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: 8 }} />
          ) : (
            <div className="image-preview-text text-center text-secondary">
              <i className="bi bi-image" style={{ fontSize: '2rem' }}></i>
              <div>Click to select image</div>
              {/* <small>Choose your profile picture</small> */}
            </div>
          )}
        </div>
        <button
          type="button"
          className="btn btn-outline-secondary ms-2 d-flex align-items-center justify-content-center"
          style={{ height: 200, width: 48, padding: 0, fontSize: '1.5rem' }}
          onClick={() => inputRef.current && inputRef.current.click()}
          aria-label="Select File"
        >
          <i className="bi bi-upload"></i>
        </button>
      </div>
      {/* Modal for large image preview */}
      {showModal && preview && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000,
          }}
          onClick={() => setShowModal(false)}
        >
          <img
            src={preview}
            alt="Large Preview"
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              borderRadius: 12,
              boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
              background: '#fff',
            }}
            onClick={e => e.stopPropagation()}
          />
          <button
            type="button"
            aria-label="Close"
            style={{
              position: 'fixed',
              top: 24,
              right: 32,
              background: 'transparent',
              border: 'none',
              color: '#fff',
              fontSize: 36,
              cursor: 'pointer',
              zIndex: 2100,
            }}
            onClick={() => setShowModal(false)}
          >
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
