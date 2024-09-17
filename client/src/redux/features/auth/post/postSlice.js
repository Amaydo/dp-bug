import {createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../../util/axios.js'

const initialState = {
    posts: [],
    popularPosts: [],
    loading: false,
}

export const createPost = createAsyncThunk(
    '/posts/createPost', 
    async(params) =>{
        try {
            const {data} = await axios.post('/posts', params)
            return data 
        } catch (error) {
            
        }
    }

)

export const deletePost = createAsyncThunk('post/deletePost', async(id) =>{
    try {
        const {data} = await axios.delete(`/posts/${id}`, id)
        return data 
    } catch (error) {
        console.log(error);
    }
})

export const updatePost = createAsyncThunk(
    'post/updatePost',
    async (updatedPost) => {
        try {
            const { data } = await axios.put(
                `/posts/${updatedPost.id}`,
                updatedPost,
            )
            return data
        } catch (error) {
            console.log(error)
        }
    },
)

export const getAllPosts = createAsyncThunk('posts/getAllPosts', async () => {
    try {
        const {data} = await axios.get('/posts')
        return data 
    } catch (error) {
        console.log(error);
    }
})

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        //Создание поста
            .addCase(createPost.pending, (state) => {
                state.loading = true;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state) => {
                state.loading = false;
            })
        //Получение всех постов
            .addCase(getAllPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts  = action.payload.posts;
                state.CoolPost = action.payload.CoolPost;
            })
            .addCase(getAllPosts.rejected, (state) => {
                state.loading = false;
            })
        //Удаление
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts  = state.posts.filter((post) => post._id !== action.payload._id)
            })
            .addCase(deletePost.rejected, (state) => {
                state.loading = false;
            })
        //редактирование 
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex(
                    (post) => post._id === action.payload._id,
                )
                state.posts[index] = action.payload
            })
            .addCase(updatePost.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default postSlice.reducer