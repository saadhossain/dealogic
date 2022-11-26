import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loader from '../Components/Spinners/Loader';
import { AuthContext } from '../Context/AuthProvider';
import useUser from '../hooks/UseUser/useUser';

const AdminRouter = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const {loggedInUser, userLoading} = useUser(user?.email)
    const location = useLocation()
    if(loading || userLoading){
        return <Loader></Loader>
    }
    if(!user && loggedInUser.accountType !== 'Admin'){
        return <Navigate to='/login' state={{from: location}} replace></Navigate>
    }
    return children;
};

export default AdminRouter;