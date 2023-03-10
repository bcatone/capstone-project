import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import { updateErrors } from "../redux/error/errorSlice";
import CancelAccount from "./CancelAccount";
import UpdateAvatar from "./UpdateAvatar";

function Settings() {
  const me = useSelector((state) => state.me.value);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({me});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const data = new FormData();
    // data.append()
    fetch(`/users/${me.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => dispatch(user => updateMe(user)));
      } else {
        resp.json().then((json) => console.log(json.errors));
      }
    });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            placeholder="Enter first name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="middle_name"
            value={formData.last_name}
            placeholder="Enter middle name"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            placeholder="Enter last name"
            onChange={handleChange}
          />
        </div>
        <hr />
        <input type="submit" value="Update Account Information" />
      </form>
      {/* <UpdateAvatar /> */}
      {/* <CancelAccount /> */}
    </div>
  );
}

export default Settings;
