import React, { useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import EditAvatar from "./EditAvatar";
import MeCard from "./MeCard";

function UserProfileInfoCard({ user }) {
  const me = useSelector((state) => state.me.value);
  const [displayUrl, setDisplayUrl] = useState(user.avatar.url);
  const [isEditAvatar, setIsEditAvatar] = useState(false);
  const dispatch = useDispatch();

  const toggleAvatarModal = () => {
    setIsEditAvatar((isEditAvatar) => !isEditAvatar);
  };

  const handleAvatarChange = (file) => {
    setDisplayUrl(file);
  };

  return (
    <div className="user_card">
      <img src={user.avatar.url} alt="avatar" onClick={toggleAvatarModal} />
      {user.id === me.id && isEditAvatar ? (
        <EditAvatar
          toggleAvatarModal={toggleAvatarModal}
          onAvatarChange={handleAvatarChange}
        />
      ) : null}
      <p className="username">{user.username}</p>
      <p className="name">{user.full_name}</p>
      <p className="age">{user.age} years old</p>
    </div>
  );
}

export default UserProfileInfoCard;
