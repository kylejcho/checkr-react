import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'
import {
   createUserWithEmailAndPassword,
   signInWithEmailAndPassword,
   signOut,
   onAuthStateChanged,
} from 'firebase/auth'

const UserContext = React.createContext()

export function AuthContextProvider({ children }) {
   const [user, setUser] = useState({})
   const [loading, setLoading] = useState(true)
   function createUser(email, password) {
      return createUserWithEmailAndPassword(auth, email, password)
   }

   function signIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password)
   }

   function logout() {
      return signOut(auth)
   }

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, currentUser => {
         console.log(currentUser)
         setLoading(false)
         setUser(currentUser)
      })
      return () => {
         unsubscribe()
      }
   }, [])

   return (
      <UserContext.Provider
         value={{
            createUser,
            user,
            signIn,
            logout,
         }}
      >
         {!loading && children}
      </UserContext.Provider>
   )
}

export function UserAuth() {
   return useContext(UserContext)
}
