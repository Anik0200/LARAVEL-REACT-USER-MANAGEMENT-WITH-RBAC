import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Contexts/Auth';
import Api from '../../Api';

const CanPermission = ({ permissions = [], children }) => {

    // Auth Context
    const { user, logout } = useContext(AuthContext);

    const { http } = Api();
    const [allowed, setAllowed] = useState(false);


    useEffect(() => {

        if (!user) setAllowed(false);

        http.get('permissionCheck')
            .then((res) => {

                const userPermissions = Array.isArray(res.data.user.permission_name) ? res.data.user.permission_name : [];
                const hasAccess = permissions.some(permission => userPermissions.includes(permission));

                setAllowed(hasAccess);
            });

    }, [permissions])


    return allowed ? children : null
}

export default CanPermission
