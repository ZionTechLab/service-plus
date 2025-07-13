import  { forwardRef } from 'react';
import { Link } from 'react-router-dom'; 
import './Drawer.css';

const Drawer = forwardRef(({ isOpen, onClose }, ref) => {
  if (!isOpen) {
    return null;
  }

  return (
    <aside ref={ref} className="drawer open">
      <div className="drawer-header">
        <h3>Menu</h3>
        <button onClick={onClose} className="close-drawer-btn">
          &times; 
        </button>
      </div>
      <nav className="drawer-nav">
        <ul>
          <li>
            <Link to="/main/travel-assistant" onClick={onClose}>Travel Assistant</Link>
          </li>
          <li>
            <Link to="/main/new-itinerary" onClick={onClose}>New Itinerary</Link>
          </li>
          <li>
            <Link to="/main/service-inquiry" onClick={onClose}>Service Inquiry</Link>
          </li>
          <li>
            <Link to="/main/inquiry-list" onClick={onClose}>Inquiry List</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}); 

export default Drawer;