import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer } from '@coreui/react'

// routes config
import routes from '../routes'
import RequireAuth from './Auth/RequireAuth'
import RequireRole from './Auth/RequireRole'

const AppContent = () => {

    const roleProtectedRoutes = {
        '/dashboard': ['admin', 'operator',],
        '/users': ['admin'],
    }

    return (
        <CContainer className="px-4" lg>
            <RequireAuth>
                <Routes>
                    {routes.map((route, idx) => {

                        if (!route.element) return null;

                        const Component = route.element;

                        const allowedRoles = roleProtectedRoutes[route.path];

                        const element = allowedRoles ? (
                            <RequireRole roles={allowedRoles}>
                                <Component />
                            </RequireRole>
                        ) : (
                            <Component />
                        );

                        return (
                            route.element && (

                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={element}
                                />
                            )
                        )
                    })}
                    <Route path="/" element={<Navigate to="dashboard" replace />} />
                </Routes>
            </RequireAuth>
        </CContainer>
    )
}

export default React.memo(AppContent)
