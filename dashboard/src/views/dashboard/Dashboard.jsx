import React from 'react'
import RequireRole from '../../components/Auth/RequireRole'
import CanRole from '../../components/Auth/CanRole'
import CanPermission from '../../components/Auth/CanPermission'

const Dashboard = () => {

    return (
        <div>
            <CanPermission permissions={['delete', 'create']}>
                fdfff
            </CanPermission>
        </div>
    )
}

export default Dashboard
