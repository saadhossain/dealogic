import React, { createContext, useEffect, useState } from 'react';
import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    //Get the firebase auth
    const auth = getAuth(app);
    //Create a Provider for google login
    const googleProiver = new GoogleAuthProvider()
    //Loading state
    const [loading, setLoading] = useState(true)
    //Get user from the auth state and set to state
    const [user, setUser] = useState()
    //Create a new user using email and password
    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //Create a User using Google Account
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProiver)
    }
    //Update User Profile after registration
    const updateUser = (fullName, profileImage) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: profileImage
        })
    }
    //User Password Reset
    const passwordReset = (email) => {
        setLoading(true)
        return sendPasswordResetEmail(auth, email)
    }
    //User login
    const userLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    //User Logout
    const logOut = () => {
        setLoading(true)
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
    const authInfo = {createUser, googleLogin, updateUser, loading, setLoading, userLogin, user, logOut, passwordReset}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;