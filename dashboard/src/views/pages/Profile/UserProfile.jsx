import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Contexts/Auth'
import Api from '../../../Api';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

const UserProfile = () => {

    // Get Loged In User Id
    const userInfo = useContext(AuthContext);
    const userId = userInfo?.user?.id;

    // Base Api
    const { http } = Api();

    // state
    const [isLoading, setIsLoading] = useState(false);

    const [userProfile, setUserProfile] = useState(null);

    console.log(userProfile);


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [image, setImage] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [imageError, setImageError] = useState('');


    // Get User Info
    useEffect(() => {
        if (!userId) return;
        fetchUserInfo();
    }, [userId]);

    const fetchUserInfo = () => {
        http.get(`user/${userId}`).then((res) => {
            setUserProfile(res.data.user);
            setName(res.data.user?.name);
            setEmail(res.data.user?.email);
        });
    }

    // React Form Hook
    const {
        register,
        formState: { errors },
        trigger,
        clearErrors,
    } = useForm();

    // Update User Info
    const handleSubmit = (e) => {
        e.preventDefault();

        // Start loading
        setIsLoading(true);

        // clear Error
        setNameError('')
        setEmailError('')
        setPasswordError('')
        setImageError('')

        setImage('');


        // Collect Form Data
        const formData = new FormData();
        formData.append('name', name || '');
        formData.append('email', email || '');
        formData.append('password', password || '');
        formData.append('image', image || '');

        // Call Api
        http.post(`user/update/${userId}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((res) => {
            setIsLoading(false);

            if (res.data.status == true) {
                toast.success(res.data.message)
                clearErrors('name')
                clearErrors('email')
                fetchUserInfo();
            }

            if (res.data.status == false) {
                setNameError(res.data.error.name)
                setEmailError(res.data.error.email)
                setPasswordError(res.data.error.password)
                setImageError(res.data.error.image)
            }
        }).catch((err) => {
            setIsLoading(false);
            toast.error(err.response.data.message)
        });
    }


    return (
        <>
            <div className="container">
                <div className="row pt-3 pb-3 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#1D222B' }}>
                    <div className="col-md-8">

                        <div className="card bg-dark text-muted border-0 shadow-lg w-100" style={{ borderRadius: '16px' }}>
                            <div className="card-body text-center p-4">
                                {/* Avatar */}
                                <img
                                    src={userProfile?.image ? `http://127.0.0.1:8000/storage/userProfile/${userProfile?.image}` : 'https://placehold.co/100'}
                                    alt="User Avatar"
                                    className="rounded mb-3 border border-light"
                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                />
                                <h4 className="fw-bold text-muted">{userProfile?.name}</h4>
                                <p className="text-light mb-4 text-muted">{userProfile?.email}</p>

                                {/* Form */}
                                <form className="text-start">
                                    <div className="row">

                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <label className="form-label fw-bold text-muted">Name</label>
                                                <input type="text" value={name || ''}
                                                    className={`form-control text-muted border-2 ${errors.name ? "is-invalid" : ""}`}
                                                    {...register("name", { required: true })}
                                                    onChange={(e) => {
                                                        setName(e.target.value);
                                                        e.target.value ? clearErrors("name") : trigger("name");
                                                    }}
                                                />

                                                <p className="form-text fw-bold text-danger opacity-75">
                                                    {nameError}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <label className="form-label fw-bold text-muted text-muted">Email</label>
                                                <input type="email" value={email || ''}
                                                    className={`form-control text-muted border-2 ${errors.email ? "is-invalid" : ""}`}
                                                    {...register("email", { required: true })}
                                                    onChange={(e) => {
                                                        setEmail(e.target.value);
                                                        e.target.value ? clearErrors("email") : trigger("email");
                                                    }}
                                                />

                                                <p className="form-text fw-bold text-danger opacity-75">
                                                    {emailError}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <label className="form-label fw-bold text-muted">Image</label>
                                                <input type="file"
                                                    className="form-control text-muted border-2"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                />

                                                <div className='mt-3'>
                                                    {image && (
                                                        <img
                                                            src={URL.createObjectURL(image)}
                                                            alt="Preview"
                                                            className="rounded border border-light"
                                                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                        />
                                                    )}
                                                </div>

                                                <p className="form-text fw-bold text-danger opacity-75">
                                                    {imageError}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="mb-2">
                                                <label className="form-label fw-bold text-muted">Password</label>
                                                <input type="password"
                                                    className="form-control text-muted border-2"
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />

                                                <p className="form-text fw-bold text-danger opacity-75">
                                                    {passwordError}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="d-grid">
                                        <button type="submit"
                                            className="btn btn-secondary text-muted fw-semibold"
                                            onClick={handleSubmit}
                                            disabled={isLoading}>
                                            {isLoading ? "Updating..." : "Update Profile"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default UserProfile
