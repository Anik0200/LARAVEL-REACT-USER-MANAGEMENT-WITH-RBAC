import React from 'react'
import { BrowserRouter } from 'react-router-dom'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Users = React.lazy(() => import('./views/Users/Users'))
const UserProfile = React.lazy(() => import('./views/pages/Profile/UserProfile'))

const routes = [
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/user/profile', name: 'Profile', element: UserProfile },
    { path: '/users', name: 'Users', element: Users },
]

export default routes
