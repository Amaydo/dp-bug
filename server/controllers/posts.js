import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url'


//создание поста
export const createPost = async (req, res) => {
try {
    const {title, text} = req.body
    const user = await User.findById(req.userId)

    if (req.files) {
        let fileName = Date.now().toString() + req.files.image.name
        const __dirname = dirname(fileURLToPath(import.meta.url))
        req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))

        const newPostWithImage = new Post({
            username: user.username,
            title,
            text,
            imgUrl: fileName,
            author: req.userId,
        })

        await newPostWithImage.save()
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: newPostWithImage},
        })

        return res.json(newPostWithImage)
    }
//Создание поста без фотографии
    const newPostWithoutImage = new Post ({
        username: user.username,
        title,
        text,
        imgUrl: '',
        author: req.userId,
    })
    await newPostWithoutImage.save()
    await User.findByIdAndUpdate(req.userId,{
        $push: {posts: newPostWithoutImage},
    })
    res.json(newPostWithoutImage)
} catch (error) {
    res.json({message: 'Оишбка при создании поста!'})
    console.log(error)
}
} 
//Все посты
export const getAll = async (req, res) => { 
    try {
        const posts = await Post.find().sort('-createAt')
        const CoolPost = await Post.find().limit(5).sort('-views')
        if (!posts) {
            return res.json({message: 'Постов нет'})
        }
        res.json({posts, CoolPost})
    } catch (error) {
        res.json({message:'Ошибка в получении постов'})
    }
}

//ID
export const getById = async (req, res) => { 
    try {
        const post = await Post.findByIdAndUpdate(req.params.id,{
            $inc: {views: 1}, 
            new: true,
        })
        res.json(post)
    } catch (error) {
        res.json({message:'Ошибка в получении постов по айди'})
    }
}
// Get my posts
export const getMyPosts = async (req, res) => {
    try {
        const user = await User.findById(req.userId)
        const list = await Promise.all(
            user.posts.map((post) => {
                return Post.findById(post._id)
            }),
        )

        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так при получении ваших постов' })
    }
}
//delete
export const deletePost = async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params.id)
        if(!post) return res.json({message: 'Такого поста не существует'} )
        await User.findByIdAndUpdate(req.userId, {
            $push: {posts: req.params.id},
            })
        res.json({message: 'Пост был удалён'})
    } catch (error) {
        res.json({ message: 'Что-то пошло не так при удалении' })
    }
}
// update
export const updatePost = async (req, res) => {
    try {
        const { title, text, id } = req.body
        const post = await Post.findById(id)

        if (req.files) {
            let fileName = Date.now().toString() + req.files.image.name
            const __dirname = dirname(fileURLToPath(import.meta.url))
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName))
            post.imgUrl = fileName || ''
        }

        post.title = title
        post.text = text

        await post.save()

        res.json(post)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так при обновлении' })
    }
}
//getPostComment
export const getPostComments = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        const list = await Promise.all(
            post.comments.map((comments) => {
                return Comment.findById(comments)
            }),
        )
        res.json(list)
    } catch (error) {
        res.json({ message: 'Что-то пошло не так с коментарием' })
    }
}