import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";

const UserContext = React.createContext()

export function AuthContextProvider({ children }) {
    const [user, setUser] = useState({})

    const createUser = async (email, password) => {
        await createUserWithEmailAndPassword(auth, email, password)
        //setName(name)
    }

    function signIn(email, password) {
        return signInWithEmailAndPassword(auth, email, password)
    }

    function logout() {
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            console.log(currentUser)
            setUser(currentUser)
        })
        return ()=> {
            unsubscribe()
        }
    },[])

    return (
        <UserContext.Provider value={{createUser, user, signIn, logout }}>
            {children}
        </UserContext.Provider>
  )
}

export function UserAuth() {
    return useContext(UserContext)
}