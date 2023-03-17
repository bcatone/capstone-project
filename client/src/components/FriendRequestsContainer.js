import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriendSuggestions } from "../redux/friend_suggestions/friendSuggestionsSlice";
import { updateFriendRequests } from "../redux/friend_requests/friendRequestsSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
import { updateErrors } from "../redux/error/errorSlice";
//import FriendSuggestionCard from "./FriendSuggestionCard";
import UserCard from "./UserCard";
import FriendRequestCard from "./FriendRequestCard";

function FriendRequestsContainer() {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.me.value);
  const friendRequests = useSelector((state) => state.friend_requests.value);
  const errors = useSelector((state) => state.error.value);

  useEffect(() => {
    fetch(`/users/${me.id}/friend_requests`).then((resp) => {
      if (resp.ok) {
        resp.json().then((friendRequestsArr) => {
          dispatch(updateFriendRequests(friendRequestsArr));
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  }, []);

  return (
    <div className="connection-container text-dark">
      <div className="fs-3">Your Friend Requests</div>
      <div className="contents">
        { friendRequests && friendRequests.length > 0 ? (
          friendRequests.map((user) => (
            <FriendRequestCard key={user.id} user={user} />
          ))
        ) : (
          <div>You have no friend requests at this time.</div>
        )}
      </div>
    </div>
  );
}

export default FriendRequestsContainer;
