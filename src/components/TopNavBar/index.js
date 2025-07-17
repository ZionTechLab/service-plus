import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import "./topbar.css";
function TopNavBar({ onToggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom sticky-top">
      <div className="container-fluid">
        <button onClick={onToggleDrawer} className="btn ">
           <span className="navbar-toggler-icon"></span>
        </button>
         <span className="ms-2 fw-semibold">Good Morning, John Smith</span>
           <div class="flex-grow-1"></div>
        {/* <a className="navbar-brand" href="#">Service Plus</a> */}

        <button class="btn me-3" onClick={handleFullScreen}>
      <i class="bi bi-arrows-fullscreen"></i>
    </button>

   <div class="notification-bell me-3">
      <i class="bi bi-bell fs-5"></i>
      <span class="badge">9</span>
    </div>
 <div class="dropdown">
      <div class="d-flex align-items-center text-decoration-none " href="#" role="button" data-bs-toggle="dropdown">
        <img src="https://zoyothemes.com/silva/html/assets/images/users/user-5.jpg" alt="Profile" class="navbar-profile-img me-2"/>
        <span>{user.name}</span>
      </div>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="/profile">Profile</a></li>
        <li><a class="dropdown-item" onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
        {/* <div className="collapse navbar-collapse">
          
        </div> */}
      </div>
    </nav>
  );
}

export default TopNavBar;