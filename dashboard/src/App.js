import React, { Suspense } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { CSpinner } from '@coreui/react'
import './scss/style.scss'
import './scss/examples.scss'
import Login from './views/pages/login/Login'
import DefaultLayout from './layout/DefaultLayout'
import { Bounce, ToastContainer } from 'react-toastify';
import Page404 from './views/pages/page404/Page404'

const App = () => {
    return (
        <HashRouter>
            <ToastContainer
                position="top-center"
                theme="dark"
                transition={Bounce}
            />
            <Routes>
                <Route path="*" name="Home" element={<DefaultLayout />} />
                <Route exact path="/login" name="Login Page" element={<Login />} />
                <Route exact path="/404" name="Login Page" element={<Page404 />} />
            </Routes>
        </HashRouter>
    )
}

export default App
