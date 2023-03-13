import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateErrors } from '../redux/error/errorSlice';
import { updateMe } from "../redux/me/meSlice";
import { useNavigate } from "react-router"
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const errors = useSelector((state) => state.error.value);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
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
          navigate(`/home`)
        })
      } else {
        resp.json().then(json => {
          dispatch(updateErrors([json.errors]))
        })
      }
    })
  };

  const fieldClass = "h3 mb-3 fw-normal";
  const buttonClass = "w-100 btn btn-lg btn-primary";

  return (
    <div>
        <h1>Log In</h1>
      <form onSubmit={handleSubmit}>

        <div>
        <input
          className={fieldClass}
          type="text"
          name="username"
          value={formData.username}
          placeholder="Username"
          onChange={handleChange}
        />
        </div>
        
        <div>
        <input
          className={fieldClass}
          type="password"
          name="password"
          value={formData.password}
          placeholder="Password"
          onChange={handleChange}
        />
        </div>
        
        {errors.map((error, i) => <p key={i}>{error}</p>)}
        <input className={buttonClass} type="submit" value="Log in" />
      </form>
    </div>
  );
}

export default Login;
