import React from 'react'
import CIcon from '@coreui/icons-react'
import { CNavItem, CNavLink, CSidebarNav } from '@coreui/react'
import { cilSpeedometer, cilUser } from '@coreui/icons'
import { NavLink } from 'react-router-dom'
import CanRole from './Auth/CanRole'

const AppSidebarNav = () => {
    return (
        <CSidebarNav>

            <CanRole roles={['admin', 'operator']}>
                <CNavItem>
                    <CNavLink to="/dashboard" as={NavLink}>
                        <CIcon icon={cilSpeedometer} className="nav-icon" />
                        Dashboard
                    </CNavLink>
                </CNavItem>
            </CanRole>

            <CanRole roles={['admin']}>
                <CNavItem>
                    <CNavLink to="/users" as={NavLink}>
                        <CIcon icon={cilSpeedometer} className="nav-icon" />
                        Users
                    </CNavLink>
                </CNavItem>
            </CanRole>

        </CSidebarNav>
    )

}

export default AppSidebarNav
