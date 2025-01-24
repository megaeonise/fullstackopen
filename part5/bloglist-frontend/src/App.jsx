import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('Wrong credentials')
  const [heading, setHeading] = useState('log in to application')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
      setHeading('blogs')
      setToken(user.token)
      setErrorMessage(null)
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(()=> {
        setErrorMessage(null)
      }, 5000)

    }
    console.log('logging in with', username)
  }

  useEffect(() => {
    console.log(token, 'test2')
    blogService.getAll(token).then(blogs =>
      setBlogs( blogs )
    )  
  }, [user])

  const loginForm = () => (
    <form onSubmit={handleLogin}>
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

  return (
    <div>
      <h2>{heading}</h2>
      {user===null ? loginForm() : 
      <div>
        <p>{user.name} logged in</p>
      </div>}
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App