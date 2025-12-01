import { Link } from 'react-router';

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-6 bg-gray-900 text-white">
      <div className="flex items-center space-x-4">
        
        <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-500 flex items-center justify-center rounded text-white font-bold text-xl">M</div>
            <span className="text-2xl font-bold text-white tracking-wide">Music Magic</span>
        </Link>
      </div>
      <div className="hidden md:flex items-center space-x-8 font-medium">
        <Link to="/catalog" className="hover:text-purple-500 transition duration-300">Catalog</Link>
        <Link to="/create" className="hover:text-purple-500 transition duration-300">Create</Link>
        <Link to="/about" className="hover:text-purple-500 transition duration-300">About</Link>
        <Link to="/contact" className="hover:text-purple-500 transition duration-300">Contact Us</Link>
        <Link to="/auth/login" className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-md font-medium transition duration-300 ml-4">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
