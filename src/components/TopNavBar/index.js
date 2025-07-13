import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectUser } from '../../features/auth/authSlice'; 
import { useNavigate } from 'react-router-dom';
import './TopNavBar.css';

function TopNavBar({ onToggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser); 

  const handleLogout = () => {
    dispatch(logoutSuccess()); 
    navigate('/login', { replace: true });
  };

  return (
    <nav className="top-nav-bar ">

      <div className="nav-left">
        <button onClick={onToggleDrawer} className="drawer-toggle-btn">
          ☰ 
        </button>
        <span className="nav-title">Travel Assistant</span>
      </div>
      <div className="nav-right">
        {user && <span className="user-greeting">Hello, {user.name}!</span>}
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default TopNavBar;
