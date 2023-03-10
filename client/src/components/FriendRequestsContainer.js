import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriendSuggestions } from '../redux/friend_suggestions/friendSuggestionsSlice';
import { updateFriendRequests } from "../redux/friend_requests/friendRequestsSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateErrors } from '../redux/error/errorSlice';
//import FriendSuggestionCard from "./FriendSuggestionCard";
import UserCard from "./UserCard";
import FriendRequestCard from "./FriendRequestCard";

function FriendRequestsContainer() {
    const dispatch = useDispatch();

  const me = useSelector((state) => state.me.value);
  const friendRequests = useSelector((state) => state.friend_requests.value);
  const errors = useSelector((state) => state.error.value);

  useEffect(() => {
    fetch(`/users/${me.id}/friend_requests`)
        .then(resp => {
            if (resp.ok) {
                resp.json().then(friendRequestsArr => dispatch(updateFriendRequests(friendRequestsArr)));
            } else {
                resp.json().then((json) => dispatch(updateErrors([json.errors])))
            }
        })
  }, []);

  return (
    <div className="row">
      <p>Friend Requests</p>
      {friendRequests.length > 0
        ? friendRequests.map((user) => <FriendRequestCard key={user.id} user={user} />)
        : errors.map((error, i) => <p key={i}>{error}</p>)}
    </div>
  );
}

export default FriendRequestsContainer;
