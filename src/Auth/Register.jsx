import React from 'react'
import { useState, useEffect } from 'react';
import useSignup from '../hooks/useSignup';
import reg from './registration.jpg'
import { email, password, username } from '../utils/icons'
import { Link } from 'react-router-dom';

const Register = () => {
    const { errorSignup, registerUser } = useSignup()
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        registerUser(formData)
        setFormData({
            username: '',
            password: '',
            email: '',
        });
    };


    return (
        <div className="register w-full h-full flex flex-col md:flex-row justify-center items-center mx-[5%]" >
            <div className='border border-black md:w-1/3 w-[90%] h-1/3 my-[4%] rounded-2xl p-3 flex flex-col'>
                <h2 className='font-bold text-3xl text-center my-5'>Registration Form</h2>
                <div className="head flex flex-col md:flex-row justify-center items-center space-x-2">
                    <h4 className='text-center text-blue-600 font-bold text-xl'>Let's Start</h4>
                    <h4 className='text-center text-blue-600 '>Your Finance Journey now !!</h4>
                </div>
                <form onSubmit={handleSubmit} className='my-7'>
                {errorSignup && <p className='text-sm text-red-600 text-center'>*{errorSignup}</p>}
                    <div className='my-5 flex flex-col md:flex-row justify-center items-center space-x-3'>
                        {username}
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className='p-2 my-1 bg-slate-200 placeholder-black md:w-3/4 w-full'
                            placeholder='Enter username'
                        />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-center items-center space-x-3'>
                        {email}
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='p-2 my-1 bg-slate-200 placeholder-black  md:w-3/4 w-full'
                            placeholder='Enter Email'
                        />
                    </div>
                    <div className='my-5 flex flex-col md:flex-row justify-center items-center space-x-3'>
                        {password}
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className='p-2 my-1 bg-slate-200 placeholder-black  md:w-3/4 w-full'
                            placeholder='Create Password'
                        />
                    </div>
                    <button type="submit" className='bg-blue-700 p-2 my-2 mx-[25%] text-white font-bold rounded-2xl w-[50%] hover:bg-blue-500'>Register</button>
                </form>
                <h4 className='text-center'>Already a user?</h4>
                <Link to='/Login'>
                    <button className='border border-black p-2 my-2 mx-[25%] text-black font-bold rounded-2xl w-[50%] hover:bg-slate-200'>Login</button>
                </Link>
            </div>
            <img src={reg} alt="" className='md:w-1/2 w-full h-full scale-75 rounded-2xl' />
        </div>
    );
}

export default Register