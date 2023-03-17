import React, { useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";

function ChangeAvatarForm({ onAvatarSelection }) {
  const me = useSelector((state) => state.me.value);
  const [avatarDisplayUrl, setAvatarDisplayUrl] = useState(me.avatar.url);
  const [avatar, setAvatar] = useState(me.avatar);
  const errors = useSelector((state) => state.error.value);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const value = e.target.files[0];
    setAvatar(value);
    setAvatarDisplayUrl(URL.createObjectURL(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("avatar", avatar);

    fetch(`/users/${me.id}`, {
      method: "PATCH",
      body: formData,
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((me) => dispatch(updateMe(me)));
      } else {
        resp.json().then((json) => console.log(json));
      }
    });
  };

  return (
    <div>
      {errors.length > 0 ? (
        <div className="alert alert-danger">
          {errors.map((error, i) => (
            <p key={i}>{error}</p>
          ))}
        </div>
      ) : null}

      <img className="avatar-preview" src={avatarDisplayUrl} />
      <form className="row g-3" onSubmit={handleSubmit}>

        <div className="col-md-4"></div>

        <div className="col-md-4">
          <input
            className="form-control"
            type="file"
            multiple={false}
            name="avatar"
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4"></div>

        <div className="col-md-4"></div>

        <div className="col-md-4">
          <input
            className="btn btn-primary"
            type="submit"
            value="Change Avatar"
          />
        </div>

        <div className="col-md-4"></div>
        
      </form>
    </div>
  );
}

export default ChangeAvatarForm;
