import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    //Get the firebase auth
    const auth = getAuth(app);
    //Loading state
    const [loading, setLoading] = useState(true)
    //Get user from the auth state and set to state
    const [user, setUser] = useState()
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
    //User Logout
    const logOut = () => {
        return signOut(auth)
    }
    //Get user from auth 
    useEffect(()=> {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser)
            setLoading(false)
        })
        return () => unSubscribe()
    }, [auth])
    const authInfo = {createUser, updateUser, loading, setLoading, userLogin, user, logOut}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;