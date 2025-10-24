import React from 'react';
import { Link, useRouteError } from 'react-router';

const ErrorPages = () => {
  const error = useRouteError?.() || {};
  return (
    <div className='min-h-[60vh] flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold'>Opps Page Not Found </h2>

      <p className='mt-3 text-gray-700 '>{error.message || "The page you are looking for doesn't exist" } </p>
      <Link className="mt-4 bg-green-700 text-whit font bold px-4 py-2 rounded" to="/">Go Home -</Link>
    </div>
   
  );
};

export default ErrorPages;
