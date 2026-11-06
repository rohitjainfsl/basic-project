import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axios";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await instance.post("/auth/login", data, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div id="login">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={data.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <Link to="/register">New Here? Register First</Link>
      </div>
    </>
  );
}

export default Login;
