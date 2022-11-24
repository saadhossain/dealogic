import React, { createContext, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    //Get the firebase auth
    const auth = getAuth(app);
    //Loading state
    const [loading, setLoading] = useState(true)
    //Create a new user using email and password
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //Update User Profile after registration
    const updateUser = (fullName, profileImage) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: profileImage
        })
    }

    //User login
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const authInfo = {createUser, updateUser, loading, setLoading, userLogin}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;