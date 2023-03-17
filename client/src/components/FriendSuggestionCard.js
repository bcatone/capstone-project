import '../App.css';
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateErrors } from '../redux/error/errorSlice';
import { updateFriendSuggestions } from '../redux/friend_suggestions/friendSuggestionsSlice';
import { updateFriendRequests } from '../redux/friend_requests/friendRequestsSlice';

function FriendSuggestionCard({user}) {
    const me = useSelector((state) => state.me.value);
    const friendSuggestions = useSelector((state) => state.friend_suggestions.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSendFriendRequest = () => {
        const request = {
            sender_id: me.id,
            receiver_id: user.id
        };

        fetch(`/friend_requests`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(request)
        })
        .then (resp => {
            if (resp.ok) {
                resp.json().then(friendRequest => {
                    const filteredFriendSuggestions = friendSuggestions.filter(suggestion => user.id !== suggestion.id)
                    dispatch(updateFriendSuggestions(filteredFriendSuggestions))
                    dispatch(updateFriendRequests(friendRequest.receiver))
                })
            } else {
                resp.json().then(json => dispatch(updateErrors([json.errors])))
            }
        })
    }
    
    return (
        <div className="col user_card bg-secondary-subtle">
            <img src={user.avatar.url} alt="avatar"/> 
            <Link to={`/user/${user.id}`}>{user.username}</Link>
            <div>{user.full_name}</div>
            <div>{user.career_title}</div>
            <div>{user.location}</div>
            {me.id !== user.id ? (<button className="btn btn-primary" onClick={handleSendFriendRequest}>Connect</button>) : null}
        </div>
    )
};

export default FriendSuggestionCard;