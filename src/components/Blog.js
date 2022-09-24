import { useState } from "react";

const Blog = ({ blog, addLike }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };

    addLike(updatedBlog);
  };

  if (visible) {
    return (
      <div className="blog-container">
        <p>
          {blog.title} {blog.author} 
          <button onClick={toggleVisibility}>Hide</button>
        </p>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={handleLike}>like</button></p>
        <p>Added by {blog.user.name}</p>
      </div>
    )
  }

  return (
    <div className="blog-container">
      <p>
        {blog.title} {blog.author} 
        <button onClick={toggleVisibility}>View</button>
      </p>
    </div>
  )  
};

export default Blog;