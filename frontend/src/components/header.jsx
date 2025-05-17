import { Link } from 'react-router-dom';
import '../styles/base/header.scss';
import { logout } from '../services/authServices';
import { useNavigate } from 'react-router-dom';
import OrderModal from '../modals/OrderModal';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('jwtToken');


  const handleLogout = () => {
    logout();
    navigate('/');
    location.reload()
  };
    
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <Link className="logo-title" to="/">Restoranai</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className='nav-link' to="/">Pagrindinis</Link>
                  </li>
                  <li className="nav-item">
                    <Link className='nav-link' to="/orders">Užsakymai</Link>
                  </li>
                  <li className="nav-item">
                    <OrderModal
                      title="Užsakyti"
                    />
                  </li>
                  {!token ? <li className="nav-item">
                    <Link className='nav-link' to="/login">Prisijungti</Link>
                  </li> : ""}
                  {!token ? <li className="nav-item">
                    <Link className='nav-link' to="/register">Registracija</Link>
                  </li> : ""}
                  <li className='nav-item'>
                    <button className='nav-link text-white' onClick={handleLogout}>Logout</button>
                  </li>
                </ul>
            </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;