import React, { useContext, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import Api from '../../../Api'
import { toast } from 'react-toastify'
import { AuthContext } from '../../../Contexts/Auth'

const Login = () => {

    const { user, login } = useContext(AuthContext);

    // Nvigate
    const navigate = useNavigate();

    // Base Api
    const { http } = Api();

    // State
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const [emailError, setEmailError] = useState();
    const [passwordError, setPasswordError] = useState();


    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('email', email || '');
        formData.append('password', password || '');

        http.post('ahuthenticate', formData)
            .then((res) => {

                if (res.data.status == false) {
                    if (res.data.error) {
                        setEmailError(res.data.error.email);
                        setPasswordError(res.data.error.password);
                    }

                    if (res.data.message === 'Login failed') {
                        toast.error(res.data.message);
                    }
                }

                if (res.data.status == true) {

                    const userInfo = {
                        id: res.data.id,
                        token: res.data.token,
                        role: res.data.role,
                    }

                    login(userInfo);
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    navigate('/dashboard');
                    toast.success(res.data.message);
                }

            })
    }

    return user ? <Navigate to="/dashboard" /> : (
        <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <form>
                                        <h1>Login</h1>
                                        <p className="text-body-secondary">Sign In to your account</p>

                                        <div className="mb-2">
                                            <CInputGroup className="mb-1">
                                                <CInputGroupText>
                                                    <CIcon icon={cilUser} />
                                                </CInputGroupText>

                                                <CFormInput
                                                    placeholder="Email"
                                                    autoComplete="email"
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                            </CInputGroup>

                                            <p className='text-danger fw-bold'>{emailError}</p>
                                        </div>

                                        <div className="mb-2">
                                            <CInputGroup className="mb-1">
                                                <CInputGroupText>
                                                    <CIcon icon={cilLockLocked} />
                                                </CInputGroupText>

                                                <CFormInput
                                                    type="password"
                                                    placeholder="Password"
                                                    autoComplete="current-password"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                            </CInputGroup>

                                            <p className='text-danger fw-bold mt-1'>{passwordError}</p>
                                        </div>

                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4"
                                                    onClick={handleSubmit}>
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                    </form>
                                </CCardBody>
                            </CCard>

                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center d-flex justify-content-center align-items-center">
                                    <div>
                                        <h2>Core Ui</h2>
                                        <p>
                                            A React And Laravel Dashboard Developed By &copy;Łukasz Holeczek
                                        </p>
                                    </div>
                                </CCardBody>
                            </CCard>

                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
