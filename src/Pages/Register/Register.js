import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Register = () => {
    const { createUser, googleLogin, updateUser, setLoading } = useContext(AuthContext)
    //Use Location to redirect user after registration
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/dashboard'
    //Set Account type
    const [accountType, setAccountType] = useState('Buyer')
    //Register a new user
    const handleRegistration = (e) => {
        e.preventDefault()
        //Get the form values
        const form = e.target;
        const fullName = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        //Handle Profile Picture upload
        const profile = form.profile.files[0];
        const formData = new FormData()
        formData.append('image', profile)
        //Save profile picture to the imgbb site
        const url = 'https://api.imgbb.com/1/upload?key=ee7085d23184f77801d3c6950c563d75';
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                const profileImage = data.data.url;
                //User informations to save in database
                const userInfo = {
                    fullName,
                    email,
                    profileImage,
                    accountType
                }
                createUser(email, password)
                    .then((result) => {
                        toast.success('User Registration Successful...')
                        updateUser(fullName, profileImage)
                            .then(() => {
                            })
                        saveUser(userInfo)
                        //Get Access token from the server and save it to local storage
                        fetch('https://innova-server.vercel.app/accesstoken', {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(email)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.accessToken) {
                                    localStorage.setItem('AccessToken', data.accessToken)
                                    //After Saving the token to local storage then do others tasks
                                    form.reset()
                                    toast.success('Account Registration successful... Redirecting...')
                                    navigate(from, { replace: true })
                                    setLoading(false)
                                }
                            })
                    })
                    .catch(err => console.error(err))
            })
            .catch(err => console.error(err))
    }

    //Functionality for google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const user = result.user;
                const userInfo = {
                    fullName: user.displayName,
                    email: user.email,
                    profileImage: user.photoURL,
                    accountType: 'Buyer'
                }
                //Get Access token from the server and save it to local storage
                fetch('https://innova-server.vercel.app/accesstoken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user.email)
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('AccessToken', data.accessToken)
                            //After Saving the token to local storage then do others tasks
                            saveUser(userInfo)
                            toast.success('Account Registration Successful... Redirecting...')
                            navigate(from, { replace: true })
                            setLoading(false)
                        }
                    })
            })
            .catch(err => console.error(err))
    }
    //Save New user to the database
    const saveUser = (userInfo) => {
        fetch('https://innova-server.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
    }
    return (
        <div className='flex justify-center my-5'>
            <div className="flex flex-col max-w-md p-6 rounded-lg bg-slate-50 text-gray-700 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Create An Account</h1>
                </div>
                <form onSubmit={handleRegistration} className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-lg">Full Name</label>
                            <input type="text" name="name" id="name" placeholder="Full Name" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-lg">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Enter Email Address" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-lg">Password</label>
                            <input type="password" name="password" id="password" placeholder="********" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="profile" className="text-lg">Profile Picture</label>
                            <input type="file" name="profile" id="profile" accept='image/*' className="w-full px-3 py-2 text-gray-800" />
                        </div>
                        <div className='flex gap-3'>
                            <label htmlFor="password" className="text-lg">Account Type</label>
                            <select onChange={e => setAccountType(e.target.value)} className='border border-gray-700 px-5 rounded text-lg font-semibold'>
                                <option value='Buyer'>Buyer</option>
                                <option value='Seller'>Seller</option>
                            </select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-innova text-white">Sign Up</button>
                        </div>
                        <p className="px-6 text-lg text-center text-gray-800">Already Have an Account?
                            <Link to="/login" className="hover:underline text-innova ml-2 font-bold">Login</Link>.
                        </p>
                    </div>
                </form>
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="flex items-center justify-center w-full p-2 mt-3 space-x-4 font-semibold border rounded-md border-gray-400 duration-500 ease-in-out hover:bg-innova hover:border-innova hover:text-white">
                    <FaGoogle></FaGoogle>
                    <p>Login with Google</p>
                </button>
            </div>
        </div>
    );
};

export default Register;