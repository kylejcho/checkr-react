import React, { useState } from 'react'
import { UserAuth } from '../contexts/AuthContext'

export default function Signup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const { createUser } = UserAuth();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await createUser(email, password)
        } catch(e) {
            setError(e.message)
            console.log(e.message)
        }
    }

  return (
    <div id="signupBackground">
        <form id='signupContainer' onSubmit={handleSubmit}>
            <p id="signupHeader">Sign Up</p> 
            <div className="signupInputsContainer">
                <div className="signupInputContainer">
                    <label className="signupLabel">Email</label>
                    <input type='email' id="email" className="signupInput" required onChange={(e)=>setEmail(e.target.value)}></input>
                </div>
                <div className="signupInputContainer">
                    <label className="signupLabel">Password</label>
                    <input type='password' id="password" className="signupInput" required onChange={(e)=>setPassword(e.target.value)}></input>
                </div>
            </div>
            <button id="signupButton">Sign Up</button>
            <div className="signupInputContainer"></div>
            <p>Already have an account? Log In</p>
        </form>
    </div>
  )
}
