import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess, selectUser } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function TopNavBar({ onToggleDrawer }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);

  const handleLogout = () => {
    dispatch(logoutSuccess());
    navigate('/login', { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        <button onClick={onToggleDrawer} className="btn btn-dark">
          <i className="bi bi-list"></i>
        </button>
        <a className="navbar-brand" href="#">Service Plus</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <span className="nav-link">Hello, {user.name}!</span>
            </li>
            <li className="nav-item">
              <button onClick={handleLogout} className="btn btn-outline-light">
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default TopNavBar;