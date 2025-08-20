import { useEffect, useMemo, useRef, useState } from 'react';
import './ImageMultiInputField.css';

/**
 * ImageMultiInputField
 * - Formik-compatible multiple image picker with previews
 * - Normalizes values to objects: { id, src?, file?, status: 'existing'|'new'|'removed' }
 * - Allows distinguishing initial (existing) images from newly added ones
 */
export default function ImageMultiInputField({ name, formik, className, placeholder, max = 20 }) {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [viewer, setViewer] = useState({ open: false, index: 0 });
  const [dragOver, setDragOver] = useState(false);

  const genId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

  // Raw value from formik
  const rawValue = formik?.values?.[name];

  // Normalize any incoming shape into uniform items
  const items = useMemo(() => {
    const list = Array.isArray(rawValue) ? rawValue : [];
    return list.map((item) => {
      // already normalized object
      if (item && typeof item === 'object' && (item.id || item.status)) {
        return item;
      }
      // File -> new item
      if (item instanceof File) {
        return { id: genId(), file: item, src: URL.createObjectURL(item), status: 'old' };
      }
      // string (URL/dataURI) -> existing
      if (typeof item === 'string') {
        return { id: genId(), src: item, status: 'existing' };
      }
      return null;
    }).filter(Boolean);
  }, [rawValue]);

  // If formik still has raw values (strings/Files) we should normalize and write back once
  useEffect(() => {
    const needsNormalization = Array.isArray(rawValue) && rawValue.some((it) => {
      return typeof it === 'string' || it instanceof File || !(it && (it.id || it.status));
    });
    if (needsNormalization) {
      formik?.setFieldValue?.(name, items);
    }
    // run once on mount/initial value
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Previews only for items not removed
  const displayedItems = useMemo(() => items.filter(i => i.status !== 'removed'), [items]);
  const previews = useMemo(() => displayedItems.map(i => i.src || ''), [displayedItems]);

  useEffect(() => {
    // Revoke blobs on unmount
    return () => {
      items.forEach((it) => {
        if (it?.src?.startsWith('blob:')) URL.revokeObjectURL(it.src);
      });
    };
  }, [items]);

  const onFilesSelected = (files) => {
    if (!files || !files.length) return;
    const available = Math.max(0, max - displayedItems.length);
    const list = Array.from(files).slice(0, available);
    const newItems = list.map((f) => ({ id: genId(), file: f, src: URL.createObjectURL(f), status: 'new' }));
    formik.setFieldValue(name, [...items, ...newItems]);
  };

  const handleInputChange = (e) => onFilesSelected(e.target.files);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer?.files) onFilesSelected(e.dataTransfer.files);
  };

  // Mark removed for existing items; hard remove new items
  const removeAt = (idx) => {
    const item = displayedItems[idx];
    if (!item) return;
    if (item.status === 'existing') {
      // mark as removed but keep in array for consumer to process deletions
      const next = items.map(it => it.id === item.id ? { ...it, status: 'removed' } : it);
      formik.setFieldValue(name, next);
    } else {
      // new items: remove entirely
      const next = items.filter(it => it.id !== item.id);
      formik.setFieldValue(name, next);
      if (item.src?.startsWith('blob:')) URL.revokeObjectURL(item.src);
    }
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
          <small className="text-secondary">{displayedItems.length}/{max} selected</small>
        </div>
      </div>

      {displayedItems.length > 0 && (
        <div className="image-multi-strip mt-2">
          <button type="button" className="image-multi-arrow left" onClick={() => scrollBy(-1)} aria-label="Scroll left">
            <i className="bi bi-chevron-left"></i>
          </button>
          <div className="image-multi-scroll" ref={containerRef}>
            {displayedItems.map((it, idx) => (
              <div className="image-thumb" key={it.id} onClick={() => setViewer({ open: true, index: idx })}>
                {it.src && <img src={it.src} alt={`img-${idx}`} />}
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
