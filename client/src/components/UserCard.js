import '../App.css';
import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

function UserCard({user}) {
    const me = useSelector((state) => state.me.value);

    // const handleClickOnUser = () => {
    //     // if (me.id === user.id) {
    //     //     navigate(`/user/${me.username}`)
    //     // } else {
    //     //     console.log("Another User")
    //     // }

    //     navigate(`user/${user.username}`)
    // }
    
    return (
        <div className="col user_card bg-dark bg-gradient text-light-emphasis">
            <img src={user.avatar.url} alt="avatar"/> 
            <Link to={`/user/${user.id}`}>{user.username}</Link>
            <p>{user.full_name}</p>
            <p>{user.age} years old</p>
            <p>{user.location}</p>
            {me.id !== user.id ? (<button>Connect</button>) : null}
        </div>
    )
};

export default UserCard;