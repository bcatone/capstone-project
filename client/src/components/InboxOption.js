import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function InboxOption ({id, username1, username2}) {
    const me = useSelector((state) => state.me.value)
    const username = (me.username === username2) ? username1 : username2
    return (
        <div className="inbox-option">
            {/* <span><img url={user.avatar.url} /></span> */}
            <Link to={`/messages/${id}`}>{username}</Link>
        </div>
    );
};

export default InboxOption;