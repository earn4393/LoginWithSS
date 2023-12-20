import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

export default function Login() {
    const [pwd, setPwd] = useState()
    const [user, setUser] = useState()
    const navigate = useNavigate()
    const location = useLocation()
    const redirectPath = location.state?.path || '/'

    // auth login before to previous page
    axios.defaults.withCredentials = true
    const auth = async (event) => {
        event.preventDefault();
        axios.get('http://localhost:3001/auth', { auth: { username: user, password: pwd } })
            .then(res => {
                if (res.data) {
                    navigate(redirectPath)
                    window.location.reload()
                }
            })
            .catch(err => alert("wrong username or password!"))
    };

    return (
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={e => auth(e)}>
                <label>
                    <p>Username</p>
                    <input type="text" onChange={e => setUser(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPwd(e.target.value)} />
                </label>
                <div>
                    <button type="submit" >Submit</button>
                </div>
            </form>
        </div>
    )
}