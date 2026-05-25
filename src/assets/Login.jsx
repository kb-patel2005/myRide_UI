import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from './Slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [ loginCredentials, setLoginCredentails] = useState({
    email:"",
    password:""
  }) 
  
  const handleChange = (e) => {
    setLoginCredentails({
      ...loginCredentials,
      [e.target.name] : e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser(loginCredentials));
    navigate('/');
  }

  return (
    <div className='translate-y-24 border border-purple-600 shadow-purple-500 shadow-2xl w-fit max-w-[1080px] m-auto flex rounded-2xl items-center justify-center p-6'>
      <form
        onSubmit={handleSubmit}
        className='max-w-md shadow-purple-600 bg-white bg-opacity-6 backdrop-blur-sm p-2 sm:p-8'
      >
        <h2 className='text-2xl sm:text-3xl font-bold text-purple-500 mb-6 text-center'>Login</h2>

        <label className='block text-sm text-purple-300 mb-2'>Username</label>
        <input
          type='text'
          value={loginCredentials.email}
          name='email'
          onChange={handleChange}
          placeholder='Enter your email'
          className='w-full mb-4 px-4 py-2 rounded-lg bg-transparent border border-purple-300 border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400'
          required
        />

        <label className='block text-sm text-purple-300 mb-2'>Password</label>
        <div className='relative mb-6'>
          <input
            type='password'
            name='password'
            value={loginCredentials.password}
            onChange={handleChange}
            placeholder='Enter your password'
            className='w-full px-4 py-2 rounded-lg bg-transparent border border-purple-300 border-opacity-20 focus:outline-none focus:ring-2 focus:ring-purple-400'
            required
          />
        </div>

        <button
          type='submit'
          className='w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-lg transition'
        >
          Login
        </button>
      </form>
    </div>
  )
}
