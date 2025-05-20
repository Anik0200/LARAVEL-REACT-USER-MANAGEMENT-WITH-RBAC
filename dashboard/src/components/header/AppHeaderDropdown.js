import React, { useContext } from 'react'
import {
    CAvatar,
    CDropdown,
    CDropdownDivider,
    CDropdownHeader,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
} from '@coreui/react'
import {
    cilLockLocked,
    cilUser,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { BsArrowLeftSquare } from "react-icons/bs";
import avatar8 from './../../assets/images/avatars/8.jpg'
import { AuthContext } from '../../Contexts/Auth';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { FaBars } from "react-icons/fa";

const AppHeaderDropdown = () => {

    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <CDropdown variant="nav-item">

            <CDropdownToggle caret={false}>
                <FaBars className="fs-4" />
            </CDropdownToggle>

            <CDropdownMenu className="pt-0" placement="bottom-end">
                <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">Account</CDropdownHeader>

                <CDropdownItem onClick={() => navigate('/user/profile')} >
                    <CIcon icon={cilUser} className="me-2" />
                    Profile
                </CDropdownItem>

                <CDropdownDivider />

                <CDropdownItem onClick={logout} style={{ cursor: 'pointer' }}>
                    <BsArrowLeftSquare className="me-2" />
                    LogOut
                </CDropdownItem>
            </CDropdownMenu>
        </CDropdown>
    )
}

export default AppHeaderDropdown
