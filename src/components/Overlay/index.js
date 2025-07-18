import React from 'react';
import './Overlay.css'; // For styling the overlay

function Overlay({ children }) {
  return (
    <div className="overlay">
      <div className="overlay-content">{children}</div>
    </div>
  );
}

export default Overlay;
