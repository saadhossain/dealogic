import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthProvider';

const Login = () => {
    const {userLogin} = useContext(AuthContext)
    //Handle User login functionality using email and password
    const handleUserLogin = (e) => {
        e.preventDefault()
        const form = e.target
        const email = form.email.value;
        const password = form.password.value
        console.log(email, password);
        userLogin(email, password)
        .then((result)=>{
            const user = result.user;
            console.log(user);
            toast.success('User Login Successful...')
            form.reset()
        })
        .catch(err => console.error(err))
    }
    return (
        <div className='flex justify-center'>
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
                                <label htmlFor="password" className="text-lg">Password</label>
                                <Link href="#" className="text-md hover:underline text-gray-700">Forgot password?</Link>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-800 text-gray-800" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <div>
                            <button type="submit" className="w-full px-8 py-3 font-semibold rounded-md bg-innova text-white">Sign in</button>
                        </div>
                        <p className="px-6 text-lg text-center text-gray-800">Don't have an account yet?
                            <Link to="/register" className="hover:underline text-innova ml-2 font-bold">Sign up</Link>.
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;