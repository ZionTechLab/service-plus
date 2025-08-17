import { useEffect, useMemo, useRef, useState } from 'react';
import './ImageMultiInputField.css';

/**
 * ImageMultiInputField
 * - Formik-compatible multiple image picker with previews
 * - Accepts string URLs/dataURIs and/or File objects
 * - Value is an array maintained in Formik at `name`
 */
export default function ImageMultiInputField({ name, formik, className, placeholder, max = 20 }) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [viewer, setViewer] = useState({ open: false, index: 0 });
  const [dragOver, setDragOver] = useState(false);

  // Memoize to keep hook deps stable
  const value = useMemo(() => {
    const v = formik?.values?.[name];
    return Array.isArray(v) ? v : [];
  }, [formik?.values, name]);

  // Ensure formik field is always an array
  useEffect(() => {
    if (!Array.isArray(value)) {
      formik?.setFieldValue?.(name, []);
    }
  }, [value, formik, name]);

  const previews = useMemo(() => {
    return (Array.isArray(value) ? value : []).map((item) => {
      if (item instanceof File) return URL.createObjectURL(item);
      if (typeof item === 'string') return item;
      return '';
    });
  }, [value]);

  useEffect(() => {
    // Revoke blobs on unmount
    return () => {
      previews?.forEach((src) => { if (src?.startsWith('blob:')) URL.revokeObjectURL(src); });
    };
  }, [previews]);

  const onFilesSelected = (files) => {
    if (!files || !files.length) return;
    const list = Array.from(files).slice(0, Math.max(0, max - value.length));
    const next = [...value, ...list];
    formik.setFieldValue(name, next);
  };

  const handleInputChange = (e) => onFilesSelected(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files) onFilesSelected(e.dataTransfer.files);
  };

  const removeAt = (idx) => {
    const next = value.filter((_, i) => i !== idx);
    formik.setFieldValue(name, next);
  };

  const scrollBy = (dir) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 180, behavior: 'smooth' });
  };

  return (
    <div className={`image-multi-input ${className || 'mb-3'}`}>
      {placeholder && <label className="form-label">{placeholder}</label>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="d-none"
        onChange={handleInputChange}
      />

      <div
        className={`image-multi-dropzone ${dragOver ? 'dragover' : ''}`}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        role="button"
        aria-label="Add images"
      >
        <i className="bi bi-images"></i>
        <div>
          <div className="fw-medium">Click to upload or drag & drop</div>
          <small className="text-secondary">{value.length}/{max} selected</small>
        </div>
      </div>

      {value.length > 0 && (
        <div className="image-multi-strip mt-2">
          <button type="button" className="image-multi-arrow left" onClick={() => scrollBy(-1)} aria-label="Scroll left">
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="image-multi-scroll" ref={containerRef}>
            {previews.map((src, idx) => (
              <div className="image-thumb" key={idx} onClick={() => setViewer({ open: true, index: idx })}>
                {src && <img src={src} alt={`img-${idx}`} />}
                <button type="button" className="thumb-remove" onClick={(e) => { e.stopPropagation(); removeAt(idx); }} aria-label="Remove">
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button type="button" className="image-multi-arrow right" onClick={() => scrollBy(1)} aria-label="Scroll right">
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      )}

      {formik?.touched?.[name] && formik?.errors?.[name] && (
        <div className="text-danger small">{formik.errors[name]}</div>
      )}

      {viewer.open && previews.length > 0 && (
        <div className="image-multi-modal-overlay" onClick={() => setViewer({ open: false, index: 0 })}>
          <img src={previews[viewer.index]} alt="Preview" className="image-multi-modal-img" onClick={(e) => e.stopPropagation()} />
          <button type="button" className="image-multi-modal-close" aria-label="Close" onClick={() => setViewer({ open: false, index: 0 })}>&times;</button>
          <div className="image-multi-modal-nav">
            <button type="button" aria-label="Prev" onClick={(e) => { e.stopPropagation(); setViewer(v => ({ open: true, index: (v.index - 1 + previews.length) % previews.length })); }}>
              <i className="bi bi-chevron-left"></i>
            </button>
            <button type="button" aria-label="Next" onClick={(e) => { e.stopPropagation(); setViewer(v => ({ open: true, index: (v.index + 1) % previews.length })); }}>
              <i className="bi bi-chevron-right"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
