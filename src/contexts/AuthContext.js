import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth'

const UserContext = React.createContext()

export function AuthContextProvider({ children }) {
    function createUser(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    return (
        <UserContext.Provider value={{createUser}}>
            {children}
        </UserContext.Provider>
  )
}

export function UserAuth() {
    return useContext(UserContext)
}