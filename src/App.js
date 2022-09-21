import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification';
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
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isError, setIsError] = useState(false);

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
      setIsError(false);
      setNotificationMessage(`Successfully logged in user ${user.name}`);
      setTimeout(() => {
        setNotificationMessage('');
      }, 5000);
    } catch (exception) {
      setIsError(true);
      setNotificationMessage('Wrong username or password');
      setTimeout(() => {
        setNotificationMessage('');
      }, 5000);
      console.error('Wrong username or password');
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('loggedInUser');
    setUser(null);
    setIsError(false);
    setNotificationMessage('Successfully logged out');
    setTimeout(() => {
      setNotificationMessage('');
    }, 5000);
  };

  const handleCreateBlog = async e => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url
    };

    try {
      const blog = await blogService.addBlog(newBlog);
      setIsError(false);
      setNotificationMessage(`The new blog "${blog.title}" by ${blog.author || 'author undefined'} was added`);
      setTimeout(() => {
        setNotificationMessage('');
      }, 5000);
    } catch (error) {
      setIsError(true);
      setNotificationMessage('Failed to add blog');
      setTimeout(() => {
        setNotificationMessage('');
      }, 5000);
    }

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  useEffect(() => {
    const getAndSetBlogs = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        setIsError(true);
        setNotificationMessage('Failed to fetch blogs from the server');
        setTimeout(() => {
          setNotificationMessage('');
        }, 5000);
        console.error('Failed to fetch blogs from the server');
      }
    };
    getAndSetBlogs();
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
        <Notification isError={isError} message={notificationMessage} />
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
      <Notification isError={isError} message={notificationMessage} />
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
