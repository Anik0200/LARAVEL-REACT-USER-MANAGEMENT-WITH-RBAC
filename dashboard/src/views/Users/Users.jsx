import React, { useEffect, useState } from 'react'
import Api from '../../Api'
import UserCreate from './UserCreate';
import UserEdit from './UserEdit';
import Pagination from '../../components/Pagination';
import { toast } from 'react-toastify';

const Users = () => {

    // Base Api
    const { http } = Api();

    // State
    const [users, setUsers] = useState([])

    const [paginateUsers, setPaginateUsers] = useState(null);
    const [page, setPage] = useState(1);

    const [userModal, setUserModal] = useState(false)
    const [userEditModal, setUserEditModal] = useState(false)
    const [userId, setUserId] = useState(null)

    // Fetch Users
    useEffect(() => {
        fetchUsers(page)
    }, [page])

    // Users Api
    const fetchUsers = () => {
        http.get(`/users?page=${page}`)
            .then((res) => {
                setUsers(res.data.users.data)
                setPaginateUsers(res.data.users)
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
    }

    // Delete User
    const dttUser = (id) => {
        http.delete(`users/${id}`).then(res => {
            if (res.data.status) {
                toast.success(res.data.message);

                // Remove deleted user from state
                const updatedUsers = users.filter(user => user.id !== id);
                setUsers(updatedUsers);

                // If it was the last user on the page and not the first page, go to previous page
                if (updatedUsers.length === 0 && page > 1) {
                    setPage(prev => prev - 1);
                } else {
                    fetchUsers(page);
                }
            } else {
                toast.error(res.data.message);
            }
        });
    }


    return (
        <>
            {/* Modals */}
            <UserCreate visible={userModal} setVisible={setUserModal} refetch={fetchUsers} />
            <UserEdit visible={userEditModal} setVisible={setUserEditModal} userId={userId} refetch={fetchUsers} />

            {/* Main Content */}
            <div className="container">

                <div className="row">
                    <div className="col-md-12">
                        <div className="d-flex justify-content-between align-items-center">
                            <h2>USERS</h2>
                            <button className="btn btn-sm btn-primary"
                                onClick={() => setUserModal(!userModal)}>
                                Add +
                            </button>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-md-12">

                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Role</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <th scope="row">{user.id}</th>

                                        <td>
                                            <img
                                                src={user?.image ? `http://127.0.0.1:8000/storage/userProfile/${user?.image}` : 'https://placehold.co/50'}
                                                alt="User Avatar"
                                                className="rounded mb-3 border border-light"
                                                style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                            />
                                        </td>

                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>
                                            {
                                                user.roles.map((role, index) => (
                                                    <span key={index}>{role.name}</span>
                                                ))
                                            }
                                        </td>
                                        <td>
                                            <div className='d-flex gap-2'>
                                                <button className="btn btn-info btn-sm">View</button>

                                                <button className="btn btn-secondary btn-sm"
                                                    onClick={() => {
                                                        setUserId(user.id);
                                                        setUserEditModal(!userEditModal)
                                                    }}>
                                                    Edit
                                                </button>

                                                <button className="btn btn-danger btn-sm" onClick={() => { dttUser(user.id) }}>
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="col-md-12">
                        <div className="d-flex justify-content-end">
                            {paginateUsers && <Pagination data={paginateUsers} setPage={setPage} />}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Users
