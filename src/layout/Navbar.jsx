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
    let found = menuItems.find((item) => item.route === path);
    if (!found) {
      // Support dynamic id segments like /edit/:id or /view/:id
      const patterns = [
        /^(.*\/edit)\/[^/]+$/,
        /^(.*\/view)\/[^/]+$/,
        /^(.*\/details)\/[^/]+$/,
      ];
      for (const rx of patterns) {
        const m = path.match(rx);
        if (m && m[1]) {
          found = menuItems.find((item) => item.route === m[1]);
          if (found) break;
        }
      }
    }
    return found ? found.displayName : "Page";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom sticky-top">
      <div className="container-fluid">
        <button onClick={onToggleDrawer} className="btn btn-toggle drawer-toggle-btn">
                <i className="bi bi-list"></i>
        </button>
        <div className='title'>{getPageTitle()}</div>
           <div className="flex-grow-1"></div>

        <button className="btn me-3" onClick={handleFullScreen}>
      <i className="bi bi-arrows-fullscreen"></i>
    </button>

   {/* <div class="notification-bell me-3">
      <i class="bi bi-bell fs-5"></i>
      <span class="badge">9</span>
    </div> */}
 <div className="dropdown">
      <button className="d-flex align-items-center text-decoration-none btn btn-link" type="button" data-bs-toggle="dropdown" style={{background: 'none', border: 'none', padding: 0}}>
        <img src="https://zoyothemes.com/silva/html/assets/images/users/user-5.jpg" alt="Profile" className="navbar-profile-img me-2"/>
        <span className="d-none d-md-inline">{user.name}</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-end">
        <li><div className="dropdown-item" type="button" onClick={() => navigate('/profile')}>Profile</div></li>
        <li><div className="dropdown-item" type="button" onClick={handleLogout}>Logout</div></li>
      </ul>
    </div>
        {/* <div className="collapse navbar-collapse">
          
        */}
      </div>
    </nav>
  );
}

export default Navbar;
