import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateErrors } from "../redux/error/errorSlice";
import UserCardContainer from "./UserCardContainer";
import UserCard from "./UserCard";
import Post from "./Post";
import FriendsContainer from "./FriendsContainer";
import FriendSuggestionsContainer from "./FriendSuggestionsContainer";
import FriendRequestsContainer from "./FriendRequestsContainer";
import ChatBox from "./ChatBox";

function NetworkPage() {
    const me = useSelector((state) => state.me.value);
    const errors = useSelector((state) => state.error.value);
    const friends = useSelector((state) => state.friends.value);
    const suggestions = useSelector((state) => state.friend_suggestions.value);
    const friendRequests = useSelector((state) => state.friend_requests.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();



    return (
        <div>
            <FriendsContainer />
            <FriendRequestsContainer />
            <FriendSuggestionsContainer />
        </div>
    );
};

export default NetworkPage;