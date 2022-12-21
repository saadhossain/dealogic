import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const { userLogin, googleLogin, passwordReset } = useContext(AuthContext)
    //Use Location to redirect user after registration
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/dashboard'
    //Handle User login functionality using email and password
    const handleUserLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value
        userLogin(email, password)
            .then((result) => {
                //Get Access token from the server and save it to local storage
                fetch('https://dealogic.vercel.app/getToken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.accesstoken) {
                            localStorage.setItem('AccessToken', data.accesstoken)
                            //After Saving the token to local storage then do others tasks
                            toast.success('User Login Successful...')
                            form.reset()
                            navigate(from, { replace: true })
                        }
                    })
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
                const email = user.email;
                saveUser(userInfo)
                fetch('https://dealogic.vercel.app/getToken', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.accessToken) {
                            localStorage.setItem('AccessToken', data.accessToken)
                            //After Saving the token to local storage then do others tasks
                            toast.success('Account Registration Successful... Redirecting...')
                            navigate('/dashboard')
                        }
                    })
            })
            .catch(err => console.error(err))
    }
    //Save New user to the database
    const saveUser = (userInfo) => {
        fetch('https://dealogic.vercel.app/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userInfo)
        })
    }
    //Handle password reset
    const handlePasswordReset = (e) => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        passwordReset(email)
            .then((result) => {
                form.reset()
                toast.success('Password Reset Link sent to your Email, please Check...')
            })
            .catch(error => {
                toast.error(error)
            })
    }
    return (
        <div className='flex justify-center my-5'>
            <div className="flex flex-col max-w-md p-6 rounded-lg bg-slate-50 text-gray-700 shadow-xl">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Login your Account</h1>
                </div>
                <form onSubmit={handleUserLogin} className="space-y-12 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-lg">Email address</label>
                            <input type="email" name="email" id="email" placeholder="Enter Your Email" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="forgetPassModal" className="text-lg">Password</label>
                                <label htmlFor="forgetPassModal" className="text-md hover:underline text-gray-700">Forgot password?</label>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-dealogic text-white">Sign in</button>
                        </div>
                        <p className="px-6 text-lg text-center text-gray-800">Don't have an account yet?
                            <Link to="/register" className="hover:underline text-dealogic ml-2 font-bold">Sign up</Link>.
                        </p>
                    </div>
                </form>
                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="flex items-center justify-center w-full p-2 mt-3 space-x-4 font-semibold border rounded-md border-gray-400 duration-500 ease-in-out hover:bg-dealogic hover:border-dealogic hover:text-white">
                    <FaGoogle></FaGoogle>
                    <p>Login with Google</p>
                </button>
            </div>
            {/* Password Reset Modal */}
            <input type="checkbox" id="forgetPassModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-eduhf text-white">
                    <label htmlFor="forgetPassModal" className="btn btn-sm btn-circle absolute right-2 top-2 bg-dealogic text-white hover:bg-dealogic">✕</label>
                    <div className="flex flex-col max-w-md p-2 rounded-md">
                        <div className="mb-2 text-center">
                            <h1 className="text-lg md:text-2xl font-bold text-accent">Reset Password</h1>
                        </div>
                        <form onSubmit={handlePasswordReset} className="space-y-4 ng-untouched ng-pristine ng-valid">
                            <div className="space-y-2">
                                <div className="space-y-1 text-md">
                                    <label htmlFor="email" className="block">Enter Your Email</label>
                                    <input type="email" name="email" id="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-md text-accent border border-accent font-semibold" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-dealogic">Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;