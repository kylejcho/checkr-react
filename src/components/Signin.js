import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../contexts/AuthContext'
import React, { useState } from 'react'
import { ReactComponent as Logo } from '../icons/document-text-outline.svg'
import { ReactComponent as WorkingSVG } from '../icons/working.svg'

export default function Signin() {
   //Password and email states updated on input field change
   const [password, setPassword] = useState('')
   const [email, setEmail] = useState('')

   const [error, setError] = useState('')

   const navigate = useNavigate()

   //sign-in function from userAuth context
   const { signIn } = UserAuth()

   //Once user is succesfully logged in, navigate to home page
   //Get error message if log-in is unsuccesful
   const handleSubmit = async (e) => {
      e.preventDefault()
      setError('')
      try {
         await signIn(email, password)
         navigate('/home')
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
               <p id='signupHeader'>Sign in to your account</p>
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
            <button id='signupButton'>Sign In</button>
            <p>
               Don't have an account yet? <Link to='signup'>Sign up.</Link>
            </p>
         </form>
      </div>
   )
}
