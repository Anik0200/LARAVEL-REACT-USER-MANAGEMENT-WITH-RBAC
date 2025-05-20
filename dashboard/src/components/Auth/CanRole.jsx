import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Contexts/Auth';
import Api from '../../Api'
import { Navigate } from 'react-router-dom';

const CanRole = ({ roles = [], children }) => {

    // Auth Context
    const { user, logout } = useContext(AuthContext);

    const { http } = Api();
    const [allowed, setAllowed] = React.useState(false);


    useEffect(() => {

        if (!user) {
            setAllowed(false);
            <Navigate to="/login" replace />;
        };

        if (user.role == 'user') {
            setAllowed(false);
            <Navigate to="/login" replace />;
        } else {
            http.get(`roleCheck/${user.id}`).then((res) => {

                const userRoles = res.data.user.role_names || [];
                const hasAccess = roles.some(role => userRoles.includes(role));

                setAllowed(hasAccess);

            });
        }



    }, [roles])

    return allowed ? children : null

}

export default CanRole
