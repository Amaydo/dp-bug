import { Layout } from './components/Layout.jsx'
import { Routes, Route } from 'react-router-dom'
import { MainPage } from './Pages/MainPage'
import { PostsPage } from './Pages/PostsPage'
import { PostPage } from './Pages/PostPage'
import { AddPostPage } from './Pages/AddPostPage'
import { RegisterPage } from './Pages/RegisterPage'
import { LoginPage } from './Pages/LoginPage'
import { EditPostPage } from './Pages/EditPostPage'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { get_me } from './redux/features/auth/authSlice.js'

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(get_me())
    }, [dispatch])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='posts' element={<PostsPage />} />
                <Route path=':id' element={<PostPage />} />
                <Route path=':id/edit' element={<EditPostPage />} />
                <Route path='new' element={<AddPostPage />} />
                <Route path='register' element={<RegisterPage />} />
                <Route path='login' element={<LoginPage />} />
            </Routes>

            <ToastContainer position='bottom-right' />
        </Layout>
    )
}

export default App