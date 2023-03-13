import '../App.css';
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateErrors } from '../redux/error/errorSlice';
import { updateFriends } from '../redux/friends/friendsSlice';
import { updateFriendSuggestions } from '../redux/friend_suggestions/friendSuggestionsSlice';

function FriendCard({user}) {
    const me = useSelector((state) => state.me.value);
    const friends = useSelector((state) => state.friends.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUnfriendUser = () => {
        const filteredFriends = friends.filter(friend => friend.id !== user.id);

        fetch(`/users/${me.id}/friends/${user.id}`, {method: 'DELETE'})
        .then (resp => {
            if (resp.ok) {
                resp.json().then(dispatch(updateFriends(filteredFriends)))
            } else {
                resp.json().then(json => {
                    console.log(json.errors)
                    dispatch(updateErrors([json.errors]))
                })
            }
        })
    }
    
    return (
        <div className="col user_card">
            <img src={user.avatar.url} alt="avatar"/> 
            {/* <a onClick={handleClickOnUser}>{user.username}</a> */}
            <Link to={`/user/${user.id}`}>{user.username}</Link>
            <p>{user.full_name}</p>
            <p>{user.age} years old</p>
            <p>{user.location}</p>
            {me.id !== user.id ? (<button onClick={handleUnfriendUser}>Unfriend</button>) : null}
        </div>
    )
};

export default FriendCard;