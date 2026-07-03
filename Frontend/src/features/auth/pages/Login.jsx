import { Link } from "react-router"
import "../auth.form.scss"
import React from "react"
import { useAuth } from "../hooks/useAuth"
import { useState } from "react"
import {useNavigate} from "react-router"

const Login = () => {
    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = async(e) => {
        e.preventDefault();
        try {
            await handleLogin({email,password});
            navigate("/");
        } catch (error) {
            // Error is handled in handleLogin, but we prevent navigation here
        } 
    }

    if(loading){
    return (
        <main><h1>Loadingh......</h1></main>
    )
    }

    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>

                <form onSubmit={onSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        type="email" id="email" placeholder="enter your email" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                        onChange={(e)=>{setPassword(e.target.value)}}
                        type="password" id="password" placeholder="enter your password" />
                    </div>

                    <button className="button primary-button" type="submit">Login</button>
                    <p>Don't have an account? <Link to="/register">Register</Link></p>
                </form>
            </div>
        </main>
    )
}

export default Login