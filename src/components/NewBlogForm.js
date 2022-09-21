import { useState } from "react";

const NewBlogForm = ({
  addBlog,
  onChangeMaker
}) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreateBlog = async e => {
    e.preventDefault();

    
    addBlog({
      title,
      author,
      url
    });

    setTitle('');
    setAuthor('');
    setUrl('');
  }

  return (
    <div>
      <h2>Create New Blog</h2>
        <form onSubmit={handleCreateBlog}>
          title:
          <input 
          type="text"
          value={title}
          name="title"
          onChange={onChangeMaker(setTitle)}
          />
          author:
          <input 
          type="text"
          value={author}
          name="author"
          onChange={onChangeMaker(setAuthor)}
          />
          url:
          <input 
          type="text"
          value={url}
          name="url"
          onChange={onChangeMaker(setUrl)}
          />
          <button type="submit">Create</button>
        </form>
        {/* <h2>Create New Blog</h2>
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
      </form> */}
      </div>
  )
};

export default NewBlogForm;