import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [user, setUser] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginService.login({
        username, password
      });

      window.localStorage.setItem('loggedInUser', JSON.stringify(user));
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (exception) {

      console.error('Wrong credentials');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedInUser');
    setUser(null);
  };

  const handleCreateBlog = async e => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    blogService.addBlog(newBlog);

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedInUserJSON = window.localStorage.getItem('loggedInUser');

    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);
      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  if (user === null) {
    return (
      <div>
        <h2>Please login to the app</h2>
        <form onSubmit={handleLogin}>
          Username
          <input 
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
          />
          Password
          <input 
          type="text"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <p>{user.name} is logged in</p>
      <button onClick={handleLogout}>Logout</button>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        title:
        <input 
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
        />
        author:
        <input 
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
        />
        url:
        <input 
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
        />
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default App
