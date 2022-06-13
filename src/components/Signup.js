import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import { ReactComponent as Logo } from '../icons/document-text-outline.svg'
import { ReactComponent as WorkingSVG } from '../icons/working.svg'
import { updateProfile } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../firebase'

export default function Signup() {
   //Name, email and password states updated on input field change
   const [name, setName] = useState('')
   const [email, setEmail] = useState('')
   const [password, setPassword] = useState('')

   const [error, setError] = useState('')

   function errorMessage() {
      if (error === 'Firebase: Error (auth/email-already-in-use).') {
         return <div id='signupError'>Email is already in use.</div>
      } else if (
         error ===
         'Firebase: Password should be at least 6 characters (auth/weak-password).'
      ) {
         return (
            <div id='signupError'>Password must be at least 6 characters.</div>
         )
      } else {
         return <div id='signupError'>{error}</div>
      }
   }

   const navigate = useNavigate()

   //Create user function from userAuth context
   const { createUser } = UserAuth()

   //Once user is succesfully created, update profile display name with 'name' state and navigate to home page
   //Get error message if log-in or 'updateProfile' is unsuccesful
   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      try {
         await createUser(email, password)
         updateProfile(auth.currentUser, {
            displayName: name,
         })
         navigate('/')
      } catch (e) {
         setError(e.message)
         console.log(e.message)
      }
   }

   return (
      <div id='signupBackground'>
         <div id='signupSVGContainer'>
            <div id='signupLogoContainer'>
               <Logo className='logo' />
               <h1>checkr.</h1>
            </div>
            <WorkingSVG id='workingSVG' />
         </div>
         <form id='signupContainer' onSubmit={handleSubmit}>
            <div className='signupInputsContainer'>
               <p id='signupHeader'>Sign up for a free account</p>
               <p>
                  Already have an account? <Link to='/signin'>Sign in.</Link>{' '}
               </p>
               {error && errorMessage()}
               <div className='signupInputContainer'>
                  <label className='signupLabel'>First Name</label>
                  <input
                     type='name'
                     className='signupInput'
                     placeholder='Give us a name to greet you with...'
                     required
                     onChange={(e) => setName(e.target.value)}
                  ></input>
               </div>
               <div className='signupInputContainer'>
                  <label className='signupLabel'>Email Address</label>
                  <input
                     type='email'
                     id='email'
                     className='signupInput'
                     placeholder='Enter your email...'
                     required
                     onChange={(e) => setEmail(e.target.value)}
                  ></input>
               </div>
               <div className='signupInputContainer'>
                  <label className='signupLabel'>Password</label>
                  <input
                     type='password'
                     id='password'
                     className='signupInput'
                     placeholder='Enter your password...'
                     required
                     onChange={(e) => setPassword(e.target.value)}
                  ></input>
               </div>
            </div>
            <button id='signupButton'>Sign Up</button>
         </form>
      </div>
   )
}
