import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectUser } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import "./topbar.css";
import menuItems from '../helpers/menuItems';

function Navbar({ onToggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/login', { replace: true });
  };

  const handleFullScreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Dashboard";
    const found = menuItems.find(item => item.route === path);
    return found ? found.displayName : "Page";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom sticky-top">
      <div className="container-fluid">
        <button onClick={onToggleDrawer} className="btn btn-toggle">
                <i class="bi bi-list"></i>
        </button>
        <div className='title'>{getPageTitle()}</div>
           <div class="flex-grow-1"></div>

        <button class="btn me-3" onClick={handleFullScreen}>
      <i class="bi bi-arrows-fullscreen"></i>
    </button>

   {/* <div class="notification-bell me-3">
      <i class="bi bi-bell fs-5"></i>
      <span class="badge">9</span>
    </div> */}
 <div class="dropdown">
      <button class="d-flex align-items-center text-decoration-none btn btn-link" type="button" data-bs-toggle="dropdown" style={{background: 'none', border: 'none', padding: 0}}>
        <img src="https://zoyothemes.com/silva/html/assets/images/users/user-5.jpg" alt="Profile" class="navbar-profile-img me-2"/>
        <span className="d-none d-md-inline">{user.name}</span>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><button class="dropdown-item" type="button" onClick={() => navigate('/profile')}>Profile</button></li>
        <li><button class="dropdown-item" type="button" onClick={handleLogout}>Logout</button></li>
      </ul>
    </div>
        {/* <div className="collapse navbar-collapse">
          
        */}
      </div>
    </nav>
  );
}

export default Navbar;
