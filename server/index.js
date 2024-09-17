import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import cors from 'cors'
import authRoute from './routes/auth.js';
import postRoute from './routes/posts.js'
import fileUpload from 'express-fileupload';
import commentRoute from './routes/comments.js'

const app = express()
dotenv.config()

// CONSTANTS

const PORT = process.env.PORT || 5500
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//MIDDLEWARE
app.use(cors())
app.use(fileUpload())
app.use(express.json( ))
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

async function start(){
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@userssp.fgafccx.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=UsersSP`,
        )
        console.log("Connected to database successfully");
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
    } catch (error) {
        console.log("Error connecting to database:", error);
    }
}
start();