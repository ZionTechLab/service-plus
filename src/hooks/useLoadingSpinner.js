import React from 'react';

function useLoadingSpinner(loading, options = {}) {
  const {
    text = 'Loading...',
    className = 'd-flex justify-content-center align-items-center py-5',
    spinnerClass = 'spinner-border text-primary',
    role = 'status',
  } = options;

  if (!loading) return null;

  return (
    <div className={className}>
      <div className={spinnerClass} role={role}>
        <span className="visually-hidden">{text}</span>
      </div>
    </div>
  );
}

export default useLoadingSpinner;
