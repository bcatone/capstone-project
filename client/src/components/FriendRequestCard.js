import '../App.css';
import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { updateMe } from '../redux/me/meSlice';
import { updateErrors } from '../redux/error/errorSlice';
import { updateFriendRequests } from '../redux/friend_requests/friendRequestsSlice';
import { updateFriends } from '../redux/friends/friendsSlice';

function FriendRequestCard({user}) {
    const me = useSelector((state) => state.me.value);
    const friendRequests = useSelector((state) => state.friend_requests.value);
    const friends = useSelector((state) => state.friends.value);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAcceptFriendRequest = () => {
        const friendship = {
            user_id: me.id,
            friend_id: user.id
        };

        const filteredFriendRequests = friendRequests.filter(request => user.id !== request.id)
        console.log(filteredFriendRequests)

        fetch(`/friendships`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(friendship)
        })
        .then (resp => {
            if (resp.ok) {
                resp.json().then(newFriend => {
                    dispatch(updateFriendRequests(filteredFriendRequests))
                    dispatch(updateFriends([newFriend.friend, ...friends]))
                })
            } else {
                resp.json().then(json => dispatch(updateErrors([json.errors])))
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
            {me.id !== user.id ? (<button onClick={handleAcceptFriendRequest}>Accept</button>) : null}
        </div>
    )
};

export default FriendRequestCard;