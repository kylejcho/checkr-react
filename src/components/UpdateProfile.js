import React, { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import {
   updateProfile,
   updatePassword,
   updateEmail,
   EmailAuthProvider,
   reauthenticateWithCredential,
} from 'firebase/auth'
import { auth } from '../firebase'

export default function UpdateProfile({ setProfileOpen }) {
   const nameRef = useRef()
   const emailRef = useRef()
   const passwordRef = useRef()

   const [error, setError] = useState('')

   function errorMessage() {
      if (error === 'Firebase: Error (auth/email-already-in-use).') {
         return <div id='signupError'>Email is already in use.</div>
      } else if (
         error ===
         'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
         return <div id='signupError'>Password must be at least 6 characters.</div>
      } else {
         return <div id='signupError'>{error}</div>
      }
   }

   //Create user function from userAuth context
   const { user } = UserAuth()

   const handleSubmit = async e => {
      e.preventDefault()
      setError('')

      if (nameRef.current.value != user.displayName) {
         await updateProfile(user, { displayName: nameRef.current.value })
      }
      if (emailRef.current.value != user.email) {
         await updateEmail(user, emailRef.current.value)
      }
      if (passwordRef.current.value != user.password) {
         await updatePassword(user, passwordRef.current.value)
      }

      window.location.reload()
   }

   return (
      <form
         id='signupContainer'
         onSubmit={handleSubmit}
         onClick={e => e.stopPropagation()}
      >
         <div className='signupInputsContainer'>
            <p id='signupHeader'>Profile Settings</p>
            {error && errorMessage()}
            <div className='signupInputContainer'>
               <label className='signupLabel'>First Name</label>
               <input
                  type='name'
                  className='signupInput'
                  placeholder='Change your display name...'
                  ref={nameRef}
                  defaultValue={user.displayName}
               ></input>
            </div>
            <div className='signupInputContainer'>
               <label className='signupLabel'>Email Address</label>
               <input
                  type='email'
                  id='email'
                  className='signupInput'
                  placeholder='Change your email...'
                  defaultValue={user.email}
                  ref={emailRef}
               ></input>
            </div>
            <div className='signupInputContainer'>
               <label className='signupLabel'>Password</label>
               <input
                  type='password'
                  id='password'
                  className='signupInput'
                  ref={passwordRef}
                  defaultValue={user.password}
                  placeholder=''
               ></input>
            </div>
         </div>
         <button id='signupButton' onClick={e => handleSubmit(e)}>
            Save settings
         </button>
      </form>
   )
}
