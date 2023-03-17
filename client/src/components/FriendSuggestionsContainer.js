import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateFriendSuggestions } from "../redux/friend_suggestions/friendSuggestionsSlice";
import { updateErrors } from "../redux/error/errorSlice";
import FriendSuggestionCard from "./FriendSuggestionCard";
import UserCard from "./UserCard";

function FriendSuggestionsContainer() {
  const dispatch = useDispatch();

  const me = useSelector((state) => state.me.value);
  const friendSuggestions = useSelector(
    (state) => state.friend_suggestions.value
  );
  const errors = useSelector((state) => state.error.value);

  useEffect(() => {
    fetch(`/users/${me.id}/friend_suggestions`).then((resp) => {
      if (resp.ok) {
        resp
          .json()
          .then((suggestionsArr) =>
            dispatch(updateFriendSuggestions(suggestionsArr))
          );
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  }, []);

  return (
    <div className="connection-container text-dark">
      <div className="fs-3">Friend Suggestions</div>
      <div className="contents">
        { friendSuggestions && friendSuggestions.length > 0 ? (
          friendSuggestions.map((user) => (
            <FriendSuggestionCard key={user.id} user={user} />
          ))
        ) : (
          <div>You're friends with everyone here!</div>
        )}
      </div>
    </div>
  );
}

export default FriendSuggestionsContainer;
