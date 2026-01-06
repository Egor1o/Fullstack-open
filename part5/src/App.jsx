import { useState, useEffect } from "react";
import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import { LoginForm } from "./components/LoginForm.jsx";
import { BlogForm } from "./components/BlogForm.jsx";
import Notification from "./components/Notification.jsx";
import "./index.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);

  const makeNotification = (isError, message) => {
    setNotification({ isError, message });
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

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
      <h2>{user === null ? "log in to application" : "blogs"}</h2>
      {notification !== null ? (
        <Notification
          message={notification.message}
          isError={notification.isError}
        />
      ) : null}

      {!user && (
        <LoginForm setUser={setUser} makeNotification={makeNotification} />
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
          <BlogForm makeNotification={makeNotification} />
        </div>
      )}
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
