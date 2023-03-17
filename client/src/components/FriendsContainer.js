import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateErrors } from "../redux/error/errorSlice";
import FriendCard from "./FriendCard";

function FriendsContainer() {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.me.value);
  const friends = useSelector((state) => state.friends.value);
  const errors = useSelector((state) => state.error.value);

  useEffect(() => {
    fetch(`/users/${me.id}/friends`).then((resp) => {
      if (resp.ok) {
        resp.json().then((friendsArr) => dispatch(updateFriends(friendsArr)));
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  }, []);

  return (
    <div className="connection-container text-dark">
      <div className="fs-3">My Friends</div>
      <div className="contents">
        {friends.map((friend) => (
          <FriendCard key={friend.id} user={friend} />
        ))}
      </div>
    </div>
  );
}

export default FriendsContainer;
