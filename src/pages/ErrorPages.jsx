// src/pages/ErrorPage.jsx
import React from "react";
import { Link, useRouteError } from "react-router";

const ErrorPage = () => {
  const error = useRouteError?.() || {};
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold">Ooops — Page not found</h2>
      <p className="mt-3 text-gray-600">{error.statusText || error.message || "The page you are looking for doesn't exist."}</p>
      <Link to="/" className="mt-4 bg-green-600 text-white px-4 py-2 rounded">Go Home</Link>
    </div>
  );
};

export default ErrorPage;
