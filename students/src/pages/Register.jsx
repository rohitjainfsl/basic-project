import { useState } from "react";
import { Link } from "react-router-dom";
import instance from "../axios";

function Register() {
  const [data, setData] = useState({
    name: "",
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
      const response = await instance.post("/auth/register", data);
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <div id="register">
        <form action="" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={data.name}
              onChange={handleChange}
            />
          </div>
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
          <button type="submit">Register</button>
        </form>
        <Link to="/login">Already registered? Login</Link>
      </div>
    </>
  );
}

export default Register;
