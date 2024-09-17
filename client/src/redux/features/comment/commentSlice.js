import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../util/axios';

export const createComment = createAsyncThunk(
    'comment/createComment',
    async ({ postId, comment }) => {
        try {
            const { data } = await axios.post(`comments/${postId}`, { comment });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);


export const getPostComments = createAsyncThunk(
    'comments/getPostComments',
    async (postId, thunkAPI) => {
        const response = await axios.get(`/posts/comments/${postId}`);
        return response.data; // Предполагается, что это массив комментариев
    }
);


const initialState = {
    comments: [],
    loading: false,
};

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComment.pending, (state) => {
                state.loading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = [...state.comments, action.payload];
            })
            
            .addCase(createComment.rejected, (state) => {
                state.loading = false;
            })
            .addCase(getPostComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostComments.fulfilled, (state, action) => {
                state.loading = false;
                state.comments = action.payload;
            })
            .addCase(getPostComments.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default commentSlice.reducer;
