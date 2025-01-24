import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Message from './components/Message'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isError, setIsError] = useState(false)
  const [heading, setHeading] = useState('log in to application')
  
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
  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.addBlog(token, title, author, url)
      setAuthor('')
      setUrl('')
      setTitle('')
      setErrorMessage(`a new blog ${title} by ${author} added`)
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('title or url missing or incorrect')
      console.log(exception)
      setIsError(true)
      setTimeout(()=> {
        setErrorMessage(null)
        setIsError(false)
      }, 5000)
    }
  }

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

  useEffect(() => {
    blogService.getAll(token).then(blogs =>
      setBlogs( blogs )
    )
  }, [user, errorMessage])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      setToken(user.token)
      setHeading('blogs')
    }
  }, [])

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

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
          title
            <input
            type="text"
            value={title}
            onChange={ ({target}) => setTitle(target.value)} 
            />
        </div>
        <div>
          author
            <input
            type="text"
            value={author}
            onChange={ ({target}) => setAuthor(target.value)} 
            />
        </div>
        <div>
          url
            <input
            type="text"
            value={url}
            onChange={ ({target}) => setUrl(target.value)} 
            />
        </div>
        <button type='submit'>create</button>
    </form>
  )

  return (
    <div>
      <Message message={errorMessage} isError={isError}/>
      <h2>{heading}</h2>
      {user===null ? loginForm() : 
      <div>
        <p>{user.name} logged in</p> <button onClick={handleLogout}>logout</button>
        {blogForm()}
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App