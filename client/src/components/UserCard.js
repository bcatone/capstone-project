import '../App.css';
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateFriends } from '../redux/friends/friendsSlice';
import { updateFriendSuggestions } from '../redux/friend_suggestions/friendSuggestionsSlice';

function UserCard({user}) {
    const me = useSelector((state) => state.me.value);
    const friends = useSelector((state) => state.friends.value);
    const suggestions = useSelector((state) => state.friend_suggestions.value);
    const navigate = useNavigate();

    // const handleClickOnUser = () => {
    //     // if (me.id === user.id) {
    //     //     navigate(`/user/${me.username}`)
    //     // } else {
    //     //     console.log("Another User")
    //     // }

    //     navigate(`user/${user.username}`)
    // }
    
    return (
        <div className="col user_card">
            <img src={user.avatar.url} alt="avatar"/> 
            {/* <a onClick={handleClickOnUser}>{user.username}</a> */}
            <Link to={`/user/${user.id}`}>{user.username}</Link>
            <p>{user.full_name}</p>
            <p>{user.age} years old</p>
            <p>{user.location}</p>
            {me.id !== user.id ? (<button>Connect</button>) : null}
        </div>
    )
};

export default UserCard;