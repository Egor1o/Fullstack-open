import { useState, useEffect } from "react";
import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import { LoginForm } from "./components/LoginForm.jsx";
import { BlogForm } from "./components/BlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    const getAllBlogs = async () => {
      const allBlogs = await blogService.getAll();
      setBlogs(allBlogs);
    };
    getAllBlogs();
  }, []);

  return (
    <div>
      {!user && (
        <LoginForm setUser={setUser} setErrorMessage={setErrorMessage} />
      )}

      {user && (
        <div>
          <label>
            {user.name} logged in
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedBlogappUser");
                setUser(null);
                blogService.setToken(null);
              }}
            >
              Log Out
            </button>
          </label>
          <BlogForm />
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
