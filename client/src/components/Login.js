import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from "../redux/me/meSlice";
import { updateErrors } from '../redux/error/errorSlice';
import { updateLoading } from "../redux/loading/loadingSlice";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const errors = useSelector((state) => state.error.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value})
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    })
    .then(resp => {
      if (resp.ok) {
        resp.json().then(user => {
          dispatch(updateMe(user));
          dispatch(updateErrors([]))
          navigate(`/`)
        })
      } else {
        resp.json().then(json => {
          dispatch(updateErrors([json.errors]))
        })
      }
    })
  };

  return (
    <div>
        <h1>Log In</h1>

      <form onSubmit={handleSubmit}>

        <div>
        <input
          className="h3 mb-3 fw-normal"
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
        </div>
        
        <div>
        <input
          className="h3 mb-3 fw-normal"
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        </div>
        
        {errors.map((error, i) => <p key={i}>{error}</p>)}
        <input type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;
