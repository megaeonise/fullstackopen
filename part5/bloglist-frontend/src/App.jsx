import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [heading, setHeading] = useState('log in to application')
  
  //login logic
  const sendLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      setHeading('blogs')
      setToken(user.token)
      setErrorMessage('logged in')
      setTimeout(()=> {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    } catch (exception) {
      setIsError(true)
      setErrorMessage('wrong username or password')
      setTimeout(()=> {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
    console.log('logging in with', username)
  }
  //blog creation handling
  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      await blogService.addBlog(token, blog)
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('title or url missing or incorrect')
      setIsError(true)
      setTimeout(()=> {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

  //handling logout
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setHeading('log in to application')
    setUser(null)
    setToken('')
    setBlogs([])
    setErrorMessage('logged out')
    setTimeout(()=> {
      setErrorMessage(null)
    }, 5000)
  }

  //For getting the list of blogs
  useEffect(() => {
    if(user!==null){
      blogRefresh()
    }
  }, [user, errorMessage])

  //checking if user is stored in storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
      setHeading('blogs')
    }
  }, [])

  //getting blogs
  const blogRefresh = () => {
    blogService.getAll(token).then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes-a.likes))
    )
  }



  const loginForm = () => (
    <form onSubmit={sendLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            onChange={ ({target}) => setUsername(target.value)} 
            />
        </div>
        <div>
          password
            <input
            type="text"
            value={password}
            onChange={ ({target}) => setPassword(target.value)} 
            />
        </div>
        <button type='submit'>login</button>
      </form>
  )

  const blogFormRef = useRef()

  return (
    <div>
      <Message message={errorMessage} isError={isError}/>
      <h2>{heading}</h2>
      {user===null ? loginForm() : 
      <div>
        <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
        <Togglable buttonLabel="new blog" closeButtonLabel="cancel" ref={blogFormRef}>
          <BlogForm createBlog={createBlog}/>
        </Togglable>
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} token={token} blogRefresh={blogRefresh}/>
      )}
    </div>
  )
}

export default App