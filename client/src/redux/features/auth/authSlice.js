import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from '../../../util/axios.js' 

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status:null,
}

export const registerUser = createAsyncThunk(
    'auth/registerUser', 
    async ({username, password}) =>{
        try {
            const {data} = await axios.post('/auth/register',{
                username,
                password,
            })
            if(data.token){
                window.localStorage.setItem('token',data.token)
            }
            return data
        } catch (error) {
            console.log(error,"Ошибка в слайсе")
        }
    },
)

export const loginUser = createAsyncThunk(
  'auth/loginUser', 
  async ({username, password}) =>{
      try {
          const {data} = await axios.post('/auth/login',{
              username,
              password,
          })
          if(data.token){
              window.localStorage.setItem('token',data.token)
          }
          return data
      } catch (error) {
          console.log(error,"Ошибка в слайсе")
      }
  },
)

export const get_me = createAsyncThunk(
    'auth/me', 
    async () =>{
        try {
            const {data} = await axios.get('/auth/me')
            if(data.token){
                window.localStorage.setItem('token',data.token)
            }
            return data
        } catch (error) {
            console.log(error,"Ошибка в слайсе")
        }
    },
  )

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout:(state) => {
        state.user = null
        state.token = null
        state.isLoading = false
        state.status = null
    },
  },
  extraReducers: (builder) => {
    // Register user
    builder
        .addCase(registerUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.error?.message || action.payload?.message;
        });

    // Login user
    builder
        .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.user;
            state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.error?.message || action.payload?.message;
        });

    // Get me
    builder
        .addCase(get_me.pending, (state) => {
            state.isLoading = true;
            state.status = null;
        })
        .addCase(get_me.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload?.user;
            state.token = action.payload?.token;
        })
        .addCase(get_me.rejected, (state, action) => {
            state.isLoading = false;
            state.status = action.error?.message || action.payload?.message;
        });
},
})    



export const checkIsAuth = state => Boolean(state.auth.token)
export const {logout} = authSlice.actions
export default authSlice.reducer