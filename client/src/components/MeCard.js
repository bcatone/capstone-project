import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MeCard() {
    const me = useSelector((state) => state.me.value);
    
    return (
        <div className="me-card">
            <img className="avatar" src={me.avatar.url} alt="avatar" />
            <div><Link to={`/user/${me.id}`} >{me.full_name}</Link></div>
            <div>{me.location}</div>
            <div>Age: {me.age}</div>
            <div>{me.location ? me.location : null}</div>
        </div>
    );
};

export default MeCard;