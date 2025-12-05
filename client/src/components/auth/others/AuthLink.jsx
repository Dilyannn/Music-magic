import { Link } from 'react-router';

const AuthLink = ({ text, linkText, linkTo }) => {
  return (
    <div className="text-center text-sm">
      <p className="text-gray-400">
        {text}{' '}
        <Link to={linkTo} className="font-medium text-purple-500 hover:text-purple-400 transition duration-200">
          {linkText}
        </Link>
      </p>
    </div>
  );
};

export default AuthLink;