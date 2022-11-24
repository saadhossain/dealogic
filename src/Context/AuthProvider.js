import React, { createContext } from 'react';
import {createUserWithEmailAndPassword, getAuth, updateProfile} from 'firebase/auth'
import app from '../Firebase/Firebase.config'

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {
    //Get the firebase auth
    const auth = getAuth(app);

    //Create a new user using email and password
    const createUser = (email, password) =>{
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //Update User Profile after registration
    const updateUser = (fullName, profileImage) => {
        return updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: profileImage
        })
    }
    const authInfo = {createUser, updateUser}
    return (
        <div>
            <AuthContext.Provider value={authInfo}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default AuthProvider;