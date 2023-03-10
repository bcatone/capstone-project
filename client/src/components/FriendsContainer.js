import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriends } from '../redux/friends/friendsSlice';
import { updateErrors } from '../redux/error/errorSlice';
import FriendCard from "./FriendCard";
import UserCard from "./UserCard";

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
    <div className="row">
      <p>Friends</p>
      {friends.length > 0
        ? friends.map((friend) => <FriendCard key={friend.id} user={friend} />)
        : errors.map((error, i) => <p key={i}>{error}</p>)}
    </div>
  );
}

export default FriendsContainer;
