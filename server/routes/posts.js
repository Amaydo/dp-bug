import { Router} from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { createPost, getAll, getById, getMyPosts, deletePost, updatePost, getPostComments } from "../controllers/posts.js";

const router = new Router()

//Создание поста
// api/posts
router.post('/', checkAuth, createPost )

//get all
// api/posts
router.get('/', getAll)

//get post id
// api/posts/id
router.get('/:id',getById)

//my post
// api/posts/user/me
router.get('/user/me', checkAuth, getMyPosts)

//delete
router.get('/:id', checkAuth, deletePost)

//update
router.put('/:id', checkAuth, updatePost)

//get Comment
router.get('/:id', getPostComments)

export default router