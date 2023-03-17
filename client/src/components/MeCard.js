import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MeCard() {
    const me = useSelector((state) => state.me.value);
    
    return (
        <div className="me-card bg-secondary-subtle bg-gradient text-dark">
            <img className="avatar" src={me.avatar.url} alt="avatar" />
            <div><Link to={`/user/${me.id}`} >{me.username}</Link></div>
            <div>{me.full_name}</div>
            <div>{me.career_title}</div>
            <div>{me.location}</div>
            
        </div>
    );
};

export default MeCard;