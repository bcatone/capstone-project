import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function InboxOption ({messageInfo}) {
    const me = useSelector((state) => state.me.value)

    return (
        <div className="inbox-option">
            <Link to={`/user/${me.id}/messages/${messageInfo.direct_message_id}`}>{messageInfo.username}</Link>
        </div>
    );
};

export default InboxOption;