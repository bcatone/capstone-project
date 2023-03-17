import "../App.css";
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateMe } from "../redux/me/meSlice";
import { updateErrors } from "../redux/error/errorSlice";
import { updateFriendRequests } from "../redux/friend_requests/friendRequestsSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateInbox } from "../redux/inbox/inboxSlice";

function FriendRequestCard({ user }) {
  const me = useSelector((state) => state.me.value);
  const friendRequests = useSelector((state) => state.friend_requests.value);
  const friends = useSelector((state) => state.friends.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAcceptFriendRequest = () => {
    const friendship = {
      user_id: me.id,
      friend_id: user.id,
    };

    fetch(`/friendships`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(friendship),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((newFriend) => {
          const filteredFriendRequests = friendRequests.filter(
            (request) => {
              console.log(request)
              return request.id !== user.id}
          );
          dispatch(updateFriendRequests(filteredFriendRequests));
          dispatch(updateFriends([newFriend, ...friends]));
          dispatch(updateInbox(me.conversation_info))
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  return (
    <div className="col user_card bg-secondary-subtle">
      <img src={user.avatar.url} alt="avatar" />
      {/* <a onClick={handleClickOnUser}>{user.username}</a> */}
      <Link to={`/user/${user.id}`}>{user.username}</Link>
      <div>{user.full_name}</div>
      <div>{user.career_title}</div>
      <div>{user.location}</div>
      {me.id !== user.id ? (
        <button className="btn btn-primary" onClick={handleAcceptFriendRequest}>Accept</button>
      ) : null}
    </div>
  );
}

export default FriendRequestCard;
