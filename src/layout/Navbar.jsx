import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectUser, selectInitData } from '../features/auth/authSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import "./topbar.css";
import menuItems from '../helpers/menuItems';
import buildCombinedMenuItems from '../helpers/buildMenuItems';

function Navbar({ onToggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const initData = useSelector(selectInitData);
  const location = useLocation();
  const combinedMenuItems = buildCombinedMenuItems(menuItems, initData);

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
    // Exact match first
    let found = combinedMenuItems.find((item) => item.route === path);
    if (!found) {
      // Longest-prefix match (handles nested like /foo/bar/edit/123)
      const candidates = combinedMenuItems.filter((item) =>
        path === item.route || path.startsWith(item.route + "/")
      );
      if (candidates.length) {
        candidates.sort((a, b) => b.route.length - a.route.length);
        found = candidates[0];
      }
    }
    if (!found) {
      // Legacy fallback for explicit edit/view/details bases
      const patterns = [
        /^(.*\/edit)\/[^/]+$/,
        /^(.*\/view)\/[^/]+$/,
        /^(.*\/details)\/[^/]+$/,
      ];
      for (const rx of patterns) {
        const m = path.match(rx);
        if (m && m[1]) {
          found = combinedMenuItems.find((item) => item.route === m[1]);
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
