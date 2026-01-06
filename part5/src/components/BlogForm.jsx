import { useState } from "react";
import blogService from "../services/blogs.js";

export const BlogForm = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const handleBlogAddition = async (event) => {
    event.preventDefault();

    const result = await blogService.create({
      title,
      author,
      url,
    });

    console.log("success", result);
  };
  return (
    <form onSubmit={handleBlogAddition}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => {
              setTitle(target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => {
              setAuthor(target.value);
            }}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="text"
            value={url}
            onChange={({ target }) => {
              setUrl(target.value);
            }}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  );
};
