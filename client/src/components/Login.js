import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import { updateMe } from "../redux/me/meSlice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(updateErrors([]))
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          dispatch(updateMe(user));
          dispatch(updateErrors([]));
          navigate(`/home`);
        });
      } else {
        resp.json().then((json) => {
          dispatch(updateErrors([json.errors]));
        });
      }
    });
  };

  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <h1>Log In</h1>

      {errors.length > 0 ? (
        <div className="row alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input
              className="form-control"
              type="text"
              name="username"
              value={formData.username}
              placeholder="Username"
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              className="form-control"
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleChange}
            />
          </div>
        </div>

        <input  className="btn btn-primary" type="submit" value="Log in" />
      </form>
      <p>Not a member? <Link to="/signup">Sign Up</Link></p>
    </div>
  );
}

export default Login;
