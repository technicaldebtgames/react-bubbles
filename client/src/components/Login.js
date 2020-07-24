import React, {useState} from "react";
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import './loginStyles.css';

const Login = () => {

    const [credentials, setCredentials] = useState({username: '', password: ''});
    const [errorClass, setErrorClass] = useState('do-not-display');
    const {push} = useHistory();

    const handleChange = event => {

        setCredentials({

            ...credentials,
            [event.target.name]: event.target.value
            
        });

    };

    const login = event => {

        event.preventDefault();
        
        axiosWithAuth()
            .post('/api/login', credentials)
            .then(response => {
        
                setErrorClass('do-not-display');
                window.localStorage.setItem('token', response.data.payload);
                push('/bubbles');
            
            })
            .catch(error => {
              
                setErrorClass('do-display');
                console.log(error);
              
            });
    
     };

    return (
        <div className='login-form-container'>
            <form className='login-form' onSubmit={login}>
                <label className='login-label' htmlFor='userName'>Username ↓</label>
                <input className='login-text-input' type="text" name="username" placeholder='input Username' value={credentials.username} onChange={handleChange} />
                <label className='login-label' htmlFor='password'>Password ↓</label>
                <input className='login-text-input' type="text" name="password" placeholder='input password' value={credentials.password} onChange={handleChange} />
                <button className='login-button'>Log In!</button>
                <p className={errorClass}>Please enter a valid username and password!</p>
            </form>
        </div>
    );

};

export default Login;