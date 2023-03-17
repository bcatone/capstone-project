import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import { updateErrors } from "../redux/error/errorSlice";
import ChangeAvatarForm from "./ChangeAvatarForm";

function Settings() {
  const me = useSelector((state) => state.me.value);
  const errors = useSelector((state) => state.error.value);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    first_name: me.first_name,
    last_name: me.last_name,
    email: me.email ? me.email : "",
    phone_number: me.phone_number ? me.phone_number : "",
    career_title: me.career_title ? me.career_title : "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("email", formData.email);
    data.append("phone_number", formData.phone_number);
    data.append("first_name", formData.first_name);
    data.append("middle_name", formData.middle_name);
    data.append("last_name", formData.last_name);
    data.append("career_title", formData.career_title);

    fetch(`/users/${me.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => dispatch(updateMe(user)));
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  const fieldClass = "h3 mb-3 fw-normal";
  return (
    <div>
      {errors.length > 0 ? (
        <div className="alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <ChangeAvatarForm />
      <hr />
      <div className="row">
        <form className="row gd-3" onSubmit={handleSubmit}>
          <div className="col-md-4"></div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="first_name"
              value={formData.first_name}
              placeholder="*Enter first name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4"></div>

          <div className="col-md-4"></div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="last_name"
              value={formData.last_name}
              placeholder="*Enter last name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4"></div>

          <div className="col-md-4"></div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="email"
              name="email"
              value={formData.userName}
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4"></div>

          <div className="col-md-4"></div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="tel"
              name="phone_number"
              value={formData.phone_number}
              placeholder="Enter phone number"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4"></div>

          <div className="col-md-4"></div>

          <div className="col-md-4">
            <input
              className="form-control"
              type="text"
              name="career_title"
              value={formData.career_title}
              placeholder="Enter job title"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4"></div>

          <div className="col-md-4"></div>

          <div className="col-md-4">
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Account Information"
            />
          </div>

          <div className="col-md-4"></div>
        </form>
      </div>
    </div>
  );
}

export default Settings;
