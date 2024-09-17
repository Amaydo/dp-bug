import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {toast} from 'react-toastify'
import {checkIsAuth, logout } from '../redux/features/auth/authSlice'
export const NavBar = () => {

        const isAuth = useSelector(checkIsAuth)
        const dispatch = useDispatch()
        const activeStyles = {
            color: 'white'
        }

        const logoutHandler = () => {
            dispatch(logout())
            window.localStorage.removeItem('token')
            toast ('Вы вышли из системы ')
        }

    return (
    <div className='flex justify-between items-center'>
        <span className='flex justify-center items-center w-19 h-10 bg-gray-600 text-2xl text-white rounded-sm'>
            StartPlay
        </span>
        {isAuth &&(
        <ul className="flex gap-8">
            <li>
                <NavLink
                    to={'/'}
                    href='/' 
                    className='text-xl text-gray-400 hover:text-white'
                    style={({isActive})=>isActive ? activeStyles : undefined}
                >
                Главная</NavLink>
            </li>
            <li>
                <NavLink 
                    to={'/Posts'}
                    href='/' 
                    className='text-xl text-gray-400 hover:text-white'
                    style={({isActive})=>isActive ? activeStyles : undefined}
                >
                Мои Посты</NavLink>
            </li>
            <li>
                <NavLink 
                    to={'/new'}
                    href='/' 
                    className='text-xl text-gray-400 hover:text-white'
                    style={({isActive})=>isActive ? activeStyles : undefined}
                >
                Добавить Посты</NavLink>
            </li>
            
        </ul>
        )}
        <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
            {isAuth ? (
                <button onClick={logoutHandler}>Выйти</button>
            ) : (
                <Link to={'/login'}>Войти</Link>
            )}
        </div>
    </div>
  )
}
