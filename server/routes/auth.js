import { Router} from "express";
import { get_me, login, register } from '../controllers/auth.js'
import { checkAuth } from "../middleware/checkAuth.js";
const authRoute = new Router()

//REGISTER
authRoute.post('/register', register)
//lOGIN
authRoute.post('/login', login)
//GET_ME
authRoute.get('/me', checkAuth ,get_me)

export default authRoute