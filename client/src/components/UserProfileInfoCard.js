import React, { useState } from "react";
import { useSelector} from "react-redux";
import EditAvatar from "./EditAvatar";

function UserProfileInfoCard({ user }) {
  const me = useSelector((state) => state.me.value);
  const [isEditAvatar, setIsEditAvatar] = useState(false);

  const toggleAvatarModal = () => {
    setIsEditAvatar((isEditAvatar) => !isEditAvatar);
  };

  const handleAvatarChange = (file) => {

  };

  return (
    <div className="user_card bg-secondary-subtle bg-gradient text-dark">
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
