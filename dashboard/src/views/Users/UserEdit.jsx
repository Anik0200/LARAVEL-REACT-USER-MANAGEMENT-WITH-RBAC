import React, { useEffect, useState } from 'react'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import { useForm } from "react-hook-form";
import Api from '../../Api';
import { toast } from 'react-toastify';

const UserEdit = ({ visible, setVisible, userId, refetch }) => {

    // React Form Hook
    const {
        register,
        formState: { errors },
        trigger,
        clearErrors,
    } = useForm();

    // Base Api
    const { http } = Api();

    // State
    const [roles, setRoles] = useState([]);

    // State for Form Data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [image, setImage] = useState("");

    // State for Form Validation
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [roleError, setRoleError] = useState("");
    const [imageError, setImageError] = useState("");


    // Fetch Roles and User Data
    useEffect(() => {
        fetchRoles();
    }, [])

    useEffect(() => {
        if (userId) {
            fetchUser();
        }
    }, [userId])

    const fetchRoles = () => {
        http.get('usersRoles').then((res) => {
            setRoles(res.data.roles);
        }).catch((err) => {
            console.log(err);
        })
    }

    const fetchUser = () => {
        http.get(`user/${userId}`).then((res) => {
            if (res.data.status !== false) {
                setName(res.data.user.name);
                setEmail(res.data.user.email);
                setRole(res.data.user.role[0]);
            }
        });
    }

    // Handle Form Submit
    const handleUpdate = (e) => {
        e.preventDefault();

        // clear errors
        setNameError("");
        setEmailError("");
        setRoleError("");
        setImageError("");

        // Clear Image
        setImage("");

        // Clear React Hook Form Errors
        clearErrors();

        // Collect Form Data
        const formData = new FormData();
        formData.append('_method', 'put');
        formData.append('name', name || '');
        formData.append('email', email || '');
        formData.append('role', role || '');
        formData.append('image', image || '');

        // Call Api
        http.post(`usersUpdate/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {

            if (res.data.status === true) {
                refetch();
                setVisible(false);
                toast.success(res.data.message)
            }

            if (res.data.status === false) {
                setNameError(res.data.error.name);
                setEmailError(res.data.error.email);
                setRoleError(res.data.error.role);
                setImageError(res.data.error.image);
            }

        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <>
            <CModal
                scrollable
                size="lg"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="LiveDemoExampleLabel"
            >
                <CModalHeader>
                    <CModalTitle id="LiveDemoExampleLabel">
                        Edit User {userId}
                    </CModalTitle>
                </CModalHeader>

                <CModalBody>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card p-4">
                                <form>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Name</label>
                                                <input type="text" value={name || ''}
                                                    className={`form-control text-muted border-2 ${errors.name ? "is-invalid" : ""}`}
                                                    {...register("name", { required: true })}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                        e.target.value ? clearErrors("name") : trigger("name");
                                                    }}
                                                />
                                                <p className="form-text text-danger fw-bold">{nameError}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="mb-3">
                                                <label className="form-label">Email</label>
                                                <input type="email"
                                                    value={email || ""}
                                                    className={`form-control text-muted border-2 ${errors.email ? "is-invalid" : ""}`}
                                                    {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        e.target.value ? clearErrors("email") : trigger("email");
                                                    }}
                                                />
                                                <p className="form-text text-danger fw-bold">{emailError}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Role</label>
                                                <select
                                                    className={`form-control text-muted border-2 ${errors.role ? "is-invalid" : ""}`}
                                                    {...register("role", { required: true })}
                                                    value={role || ""}
                                                    onChange={(e) => {
                                                        setRole(e.target.value);
                                                        e.target.value ? clearErrors("role") : trigger("role");
                                                    }}>

                                                    {
                                                        roles.length > 0 &&
                                                        roles.map((role) => (
                                                            <option key={role.id} value={role.name}>
                                                                {role.name}
                                                            </option>
                                                        ))
                                                    }
                                                </select>
                                                <p className="form-text text-danger fw-bold">{roleError}</p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-3">
                                                <label className="form-label">Image</label>
                                                <input type="file" className="form-control"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                />
                                                <p className="form-text text-danger fw-bold">{imageError}</p>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </CModalBody>

                <CModalFooter>
                    <CButton color="secondary" onClick={() => {
                        // clear react-hook-form errors
                        clearErrors();

                        // Refetch All Data
                        fetchRoles();
                        fetchUser();

                        // close modal
                        setVisible(false);
                    }}>
                        Close
                    </CButton>

                    <CButton color="primary" onClick={handleUpdate}>
                        Update
                    </CButton>
                </CModalFooter>
            </CModal>
        </>
    )
}

export default UserEdit
