import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../src/assets/Logo.svg'; 

const PageNotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center px-4">
      <img src={logo} alt="Logo" className="w-136 mb-6" />
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-base text-gray-600 mb-6">
        Oops! The page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="text-blue-600 hover:underline text-base font-medium"
      >
        Go Back to Home
      </Link>
    </div>
  );
};

export default PageNotFound;
