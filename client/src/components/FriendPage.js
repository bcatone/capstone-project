import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateErrors } from "../redux/error/errorSlice";
import FriendRequestsContainer from "./FriendRequestsContainer";
import FriendsContainer from "./FriendsContainer";
import FriendSuggestionsContainer from "./FriendSuggestionsContainer";

function FriendPage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(updateErrors([]))
      }, []);

    return (
        <div>
            <FriendsContainer />
            <FriendRequestsContainer />
            <FriendSuggestionsContainer />
        </div>
    );
};

export default FriendPage;