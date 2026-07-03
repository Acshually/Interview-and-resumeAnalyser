import React from 'react'
import { Link, useNavigate } from 'react-router'
import {useAuth} from "../hooks/useAuth"
import { useState } from 'react'



const Register = () => {

  const {handleRegister,loading} = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleRegister({username, email, password})
      navigate("/")
    } catch (error) {
      // Error is caught in handleRegister, but we prevent navigation here
    }
  }

  if (loading) {
    return (
      <main><h1>Loading...</h1></main>
    )
  }

  return (
    <main>
      <div className='form-container'>
        <h1>Register</h1>

        <form action="" onSubmit={onSubmit}>
          <div className='input-group'>
            <label htmlFor="username">Name</label>
            <input
            onChange={(e)=>{setUsername(e.target.value)}}
            type="text" id="username" placeholder='enter your username'/>
          </div>
          
          <div className='input-group'>
            <label htmlFor="email">Email</label>
            <input 
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email" id="email" placeholder='enter your email'/>
          </div>

          <div className='input-group'>
            <label htmlFor="password">Password</label>
            <input 
            onChange={(e)=>{setPassword(e.target.value)}}
            type="password" id="password" placeholder='enter your password'/>
          </div>

          <button className='button primary-button' type="submit">Sign up</button>

          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </main>
  )
}

export default Register