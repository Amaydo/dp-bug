import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice'
import {useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'

export const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const isAuth = useSelector(checkIsAuth)
  const [password, setPassword] = useState('')
  const {status} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() =>{ 
    if(status){
      toast(status)
    }
    if(isAuth) navigate('/')
  }, [status, isAuth, navigate])

    const handleSubmit = () => {
      try {
        dispatch(registerUser({username, password}))
        setUsername('')
        setPassword('')
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <form onSubmit={e => e.preventDefault()}
    className='w-1/4 h 60 mx-auto mt-40'
    >
        <h1 className='text-xl text-white text-center'>Регистрация</h1>
        <label className='text-xl text-gray-500'>
          Username:
          <input 
            type='text'
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder='Username'
            className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700'
          ></input>
        </label>
        <label className='text-xl text-gray-500'>
          Password:
          <input 
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder='Password'
            className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xl outline-none placeholder:text-gray-700'
          ></input>
        </label>

        <div className=' flex gap-8 justify-center mt-4'>
          <button 
          type='sumbit' 
          onClick={handleSubmit}
          className='flex justify-center items-center text-xl bg-gray-400 text-white rounded-sm py-2 px-4' >Зарегистрироваться</button>
          <Link
              to='/login'
              className='flex justify-center items-center text-xl text-white'
          >Уже есть аккаунт?</Link>
        </div>
    </form>
  )
}
