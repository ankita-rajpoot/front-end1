import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './login.css'

const Login = () => {

    const navigate = useNavigate();

    const [userauth, setUserauth] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async(e) => {
        e.preventDefault();

        try {

            const {data} = await axios.post('/api/users/login', {
                userauth,
                password
            });

            localStorage.setItem('userInfo', JSON.stringify(data));
            toast.success('You have successfully logged in!');
            navigate('/');

        } catch(err) {
            toast.error("Invalid email/phone or password!");
        }
    }

    useEffect(() => {
        //check for if exists user then redirect from login to home page
        if(localStorage.getItem('userInfo')) {
            localStorage.getItem('userInfo');
            navigate('/');
        }
    }, [navigate])

  return (
    <div className='form'>
        <div className="formGroups">
            <div className="formLeft">
                <h4 className="formsSubTitle">Connect with friends and the world around you on Miljan Peric.</h4>
                <h1 className='formsTitle'>Miljan Peric</h1>
            </div>
            <div className="formRight">
                <form onSubmit={loginHandler}>
                    <div className="formGroup">
                        <input type="text" required onChange={(e) => setUserauth(e.target.value)} placeholder='E-mail or Phone Number' />
                    </div>
                    <div className="formGroup">
                        <input type="password" required onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    </div>
                    <div className="formGroup form-btnLogin">
                        <button>Login</button>
                    </div>
                    <div className="formGroup form-btnRegister">
                        <Link to="/register">Create New Account</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Login