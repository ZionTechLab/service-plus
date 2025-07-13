import React from 'react';
import './Overlay.css'; // For styling the overlay

function Overlay({ isOpen, onClick }) {
  if (!isOpen) {
    return null;
  }

  return <div className="overlay" onClick={onClick}></div>;
}

export default Overlay;
