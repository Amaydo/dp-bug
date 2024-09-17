import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CoolPosts } from '../components/CoolPosts'
import { PostsItems } from '../components/PostsItems'
import { getAllPosts } from '../redux/features/auth/post/postSlice'


export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, coolPosts } = useSelector((state) => state.post)

    console.log(coolPosts)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])

    if (!posts.length) {
        return (
            <div className='text-xl text-center text-white py-10'>
                Постов не существует.
            </div>
        )
    }

    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='flex flex-col gap-10 basis-4/5'>
                    {posts?.map((post, idx) => (
                        <PostsItems key={idx} post={post} />
                    ))}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>
                        Популярное:
                    </div>

                    {coolPosts?.map((post, idx) => (
                        <CoolPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
}