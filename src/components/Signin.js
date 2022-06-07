import React, { useState } from 'react'
import { parseISO } from 'date-fns';
import { UserAuth } from '../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { collection, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";
import {auth} from "../firebase"

export default function Signin({ getData }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const { signIn } = UserAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await signIn(email, password)
            //await data()
            navigate('/checkr-react/account')
        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }
    }




    return (
        <div id="signupBackground">
            <form id='signupContainer' onSubmit={handleSubmit}>
                <div className="signupInputsContainer">
                <p id="signupHeader">Sign in to your account</p> 
                <p>Don't have an account yet? <Link to='signup'>Sign up.</Link></p>
                    <div className="signupInputContainer">
                        <label className="signupLabel">Email Address</label>
                        <input type='email' id="email" className="signupInput" required onChange={(e)=>setEmail(e.target.value)}></input>
                    </div>
                    <div className="signupInputContainer">
                        <label className="signupLabel">Password</label>
                        <input type='password' id="password" className="signupInput" required onChange={(e)=>setPassword(e.target.value)}></input>
                    </div>
                </div>
                <button id="signupButton">Sign In</button>
                <div className="signupInputContainer"></div>
            </form>
        </div>
  )
}
