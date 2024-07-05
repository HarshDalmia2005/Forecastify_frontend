import React, { useState } from 'react';
import { email, password } from '../utils/icons';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import loginimg from './vector.png';

const Login = () => {
  const { errorLogin, loginUser } = useLogin();
  const [formData, setFormData] = useState({
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
    loginUser(formData);
    setFormData({
      password: '',
      email: '',
    });
  };

  return (
    <div className="register w-full h-full flex flex-col md:flex-row justify-center items-center mx-[5%]">
      <div className='border border-black w-full md:w-1/3 my-6 p-3 rounded-2xl flex flex-col'>
        <h2 className='font-bold text-3xl text-center my-5'>Login Form</h2>
        <div className="head flex justify-center items-center space-x-2">
          <h4 className='text-center text-blue-600'>Welcome Back to</h4>
          <h4 className='text-center text-blue-600 font-bold text-xl'>Budget Buddy</h4>
        </div>
        <h2 className='text-center text-blue-600 text-sm'>Your Finance Manager App</h2>
        <form onSubmit={handleSubmit} className='my-7'>
          {errorLogin && <p className='text-sm text-red-600 text-center'>*{errorLogin}</p>}
          <div className='my-5 flex flex-col md:flex-row justify-center items-center space-x-3'>
            {email}
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className='p-2 my-1 bg-slate-200 placeholder-black w-full md:w-3/4'
              placeholder='Your Email'
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
              className='p-2 my-1 bg-slate-200 placeholder-black w-full md:w-3/4'
              placeholder='Your Password'
            />
          </div>
          <button className='bg-blue-700 p-2 my-2 mx-[25%] text-white font-bold rounded-2xl w-1/2 hover:bg-blue-500'>Login</button>
        </form>
        <h4 className='text-center'>New user?</h4>
        <Link to='/'>
          <button type="submit" className='border border-black p-2 my-2  mx-[25%] text-black font-bold rounded-2xl w-1/2 hover:bg-slate-200'>Register</button>
        </Link>
      </div>
      <img src={loginimg} alt="Login Illustration" className='w-full md:w-1/2 h-auto scale-75 rounded-2xl' />
    </div>
  );
}

export default Login;
