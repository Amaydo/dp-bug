import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createPost } from '../redux/features/auth/post/postSlice'

export const AddPostPage = () => {
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [image, setImage] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const Submithandler = () => {
    try {
      const data = new FormData()
      data.append('title',title)
      data.append('text',text)
      data.append('image',image)
      dispatch(createPost(data))
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  const clearForm = () => {
    setText('')
    setTitle('')
  }
  return (
    <form 
      className='w-1/3 mx-auto py-10'
      onSubmit={(e) => e.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-gray-600 text-ms mt-2 flex items-center justify-center bordred-2 border-dotted cursor-pointer'>
          Прикрепить Изображение:
          <input type='file' className='hidden' onChange={(e) => setImage(e.target.files[0])}/>
      </label>
      <div className='flex object-cover py-2 text-xl text-white'>{image && <img src={URL.createObjectURL(image)} alt={image.name} />}</div>

      <label className='text-xl text-white opacity-75'>
        Заголовок поста:
        <input type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
          placeholder='Заголовок'
          className='mt-1 text-black w-full rounded-lg bg-gray-500 border py-1 px-2 text-xss outline-none placeholder:text-gray-800'
          />
      </label>

      <label className='text-xl text-white opacity-75'>
        Текст поста:
        <textarea 
        value={text}
          placeholder='Текст Поста'
          onChange={(e) => setText(e.target.value)}
          className='mt-1 text-black w-full rounded-lg bg-gray-500 border py-1 px-2 text-xss outline-none resize-none h-30 placeholder:text-gray-800'
          />
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button 
          className='flex justify-center items-center bg-gray-600 text-xss text-white rounded-sm py-2 px-4'
          onClick={Submithandler}
        >
          Добавить
        </button>
        <button className='flex justify-center items-center bg-red-600 text-xss text-white rounded-sm py-2 px-4' onClick={clearForm}>
          Отменить
        </button>
      </div>
    </form>
  )
}
