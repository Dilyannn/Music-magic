import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { useUserContext } from '../../hooks/useUserContext';

const NavBar = () => {
  const { isAuthenticated, logoutHandler } = useUserContext();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const onLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logoutHandler();
      navigate('/');
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="flex justify-between items-center px-10 py-4 bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        
        <Link to="/" className="flex items-center space-x-3">
            <img src="/logo.png" alt="Music Magic Logo" className="h-24 w-auto object-contain" />
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-8 font-medium">
        <Link to="/catalog" className="hover-link">Catalog</Link>
        {isAuthenticated && (
            <Link to="/create" className="hover-link">Create</Link>
        )}
        <Link to="/about" className="hover-link">About</Link>
        <Link to="/contact" className="hover-link">Contact Us</Link>
        
        {isAuthenticated ? (
            <button 
              onClick={onLogout} 
              disabled={isLoggingOut}
              className={`navbar-btn ${isLoggingOut ? 'cursor-wait opacity-70' : ''}`}
            >
                {isLoggingOut ? 'Logging out...' : 'Logout'}
            </button>
        ) : (
            <Link to="/auth/login" className="navbar-btn">
                Login
            </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
