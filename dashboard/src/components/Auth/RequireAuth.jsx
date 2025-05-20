import React, { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Contexts/Auth';

const RequireAuth = ({ children }) => {

    const { user, logout } = useContext(AuthContext)

    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default RequireAuth
