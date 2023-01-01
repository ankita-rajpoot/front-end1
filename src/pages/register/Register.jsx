import React, { useEffect } from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'
import axios from 'axios'

const Register = () => {

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [userauth, setUserauth] = useState('');
    const [password, setPassword] = useState('');
    const [rPassword, setRPassword] = useState('');

    const registerHandler = async(e) => {
        e.preventDefault();

        //check password == retype password
        if(password !== rPassword) {
            toast.error('Passwords doesn`t match!');
            return
        }

        try {

            await axios.post('/api/users/register', {
                username,
                userauth,
                password
            });

            toast.success('You have successfully registered!');
            navigate('/login');

        } catch(error) {
            toast.error('Registration failed, please try again!');
        }
    }

    useEffect(() => {
        //check for if exists user then redirect from register to home page
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
                <form onSubmit={registerHandler}>
                <div className="formGroup">
                        <input type="text" onChange={(e) => setUsername(e.target.value)} required placeholder='Username' />
                    </div>
                    <div className="formGroup">
                        <input type="text" onChange={(e) => setUserauth(e.target.value)} required placeholder='E-mail or Phone Number' />
                    </div>
                    <div className="formGroup">
                        <input type="password" onChange={(e) => setPassword(e.target.value)} required placeholder='Password' />
                    </div>
                    <div className="formGroup">
                        <input type="password" onChange={(e) => setRPassword(e.target.value)} required placeholder='Password Retype' />
                    </div>
                    <div className="formGroup form-btnLogin">
                        <button>Create New Account</button>
                    </div>
                    <div className="formGroup form-btnRegister">
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Register