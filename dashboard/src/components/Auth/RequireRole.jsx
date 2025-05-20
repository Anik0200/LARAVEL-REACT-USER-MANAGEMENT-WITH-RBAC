import React, { useContext, useEffect, useState } from 'react'
import Api from '../../Api'
import { AuthContext } from '../../Contexts/Auth';
import { toast } from 'react-toastify';
import { Navigate, useNavigate } from 'react-router-dom';

const RequireRole = ({ roles, children }) => {

    // Navigate
    const navigate = useNavigate();

    // Bae Api
    const { http } = Api();

    // Auth Context
    const { user, logout } = useContext(AuthContext);

    // State
    const [isAuthorized, setIsAuthorized] = useState(null);


    // Check if user has the required role
    useEffect(() => {
        if (!user) setIsAuthorized(false);

        if (user.role == 'user') {
            <Navigate to="/login" replace />;
        } else {
            http.get(`roleCheck/${user.id}`).then((res) => {
                const userRoles = res.data.user.role_names;
                const hasAccess = roles.some(role => userRoles.includes(role));

                setIsAuthorized(hasAccess);
                if (!hasAccess) logout();
            });
        }

    }, [user])


    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RequireRole
