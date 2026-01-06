import { useState, useEffect } from "react";
import Blog from "./components/Blog.jsx";
import blogService from "./services/blogs.js";
import loginService from "./services/login.js";
import { LoginForm } from "./components/LoginForm.jsx";
import { BlogForm } from "./components/BlogForm.jsx";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
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
      {!user && (
        <LoginForm
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
          setUsername={setUsername}
          username={username}
        />
      )}

      {user && (
        <div>
          <label>
            {user.name} logged in
            <button
              onClick={() => {
                window.localStorage.removeItem("loggedBlogappUser");
                setUser(null);
              }}
            >
              Log Out
            </button>
          </label>
          {/*<BlogForm />*/}
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
