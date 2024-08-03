import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        // Redirect to the sign-in page if no access token is found
        return <Navigate to="/sign" />;
    }

    // Render the children if authenticated
    return children;
};

export default AuthGuard;
