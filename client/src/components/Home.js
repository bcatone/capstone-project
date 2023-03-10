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
import PostContainer from "./PostContainer";
import ProjectsContainer from "./ProjectsContainer";
import MeCard from "./MeCard";
//import MessagesList from "./MessagesList";

function Home() {
    const me = useSelector((state) => state.me.value);

    return (
        <div className="container">
            <PostContainer />
        </div>
    );
};

export default Home;