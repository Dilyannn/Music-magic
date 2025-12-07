import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-9xl font-bold text-purple-600 mb-4">404</h1>
      <h2 className="text-4xl font-bold text-white mb-6">Page Not Found</h2>
      <p className="text-xl text-gray-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>
      <Link
        to="/"
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
      >
        Go To Homepage
      </Link>
    </div>
  );
};

export default NotFound;
