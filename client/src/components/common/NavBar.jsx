import { Link, useNavigate } from 'react-router';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';

const NavBar = () => {
  const { isAuthenticated, logoutHandler } = useContext(UserContext);
  const navigate = useNavigate();

  const onLogout = async () => {
    await logoutHandler();
    navigate('/');
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
            <button onClick={onLogout} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition duration-300 ml-4">
                Logout
            </button>
        ) : (
            <Link to="/auth/login" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition duration-300 ml-4">
                Login
            </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
