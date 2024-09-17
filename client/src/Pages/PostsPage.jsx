import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { PostsItems } from '../components/PostsItems';
import axios from '../util/axios'

export const PostsPage = () => {
    const [posts, setPosts] = useState([])

    const fetchMyPosts = async () => {
        try {
            const { data } = await axios.get('/posts/user/me')
            setPosts(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMyPosts()
    }, [])

    return (
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='flex flex-col gap-10 basis-4/5'>
                {(posts && posts.length > 0) && posts.map((post, idx) => (
    <PostsItems post={post} key={post._id} />
))}
                </div>
            </div>  
        </div>
    )
}