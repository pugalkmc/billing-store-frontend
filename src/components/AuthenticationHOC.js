// AuthenticationHOC.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function checkAuthentication() {
  // Implement your authentication logic here
  // For example, you might check for a valid token in local storage, a cookie, or an authentication API call.
  // Return `true` if the admin is authenticated, `false` otherwise.
  
  // Example:
  const token = localStorage.getItem('authToken'); // Retrieve the authentication token from local storage
  return !!token; // Return `true` if a token exists; modify this logic based on your authentication method.
}

const AuthenticationHOC = (WrappedComponent) => {
  const WithAuthentication = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      // Check if the admin is authenticated
      const isAuthenticated = checkAuthentication();

      // If not authenticated, navigate to the login page
      if (!isAuthenticated) {
        navigate('/login');
      }
    }, [navigate]);

    return <WrappedComponent {...props} />;
  };

  return WithAuthentication;
};

export default AuthenticationHOC;
