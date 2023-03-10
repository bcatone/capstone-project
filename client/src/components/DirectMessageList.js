import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import DirectMessage from "./DirectMessage";
import { updateDirectMessages } from "../redux/direct_messages/directMessagesSlice";
import { updateErrors } from "../redux/error/errorSlice";
import UserCard from "./UserCard";

function DirectMessageList() {
    const { id } = useParams();
    const dispatch = useDispatch();
    // const messages = useSelector((state) => state.direct_messages.value);

    useEffect(() => {
        fetch(`/direct_message_lists/${id}/direct_messages`)
        .then(resp => {
            if (resp.ok) {
                console.log()
                resp.json().then(messages => dispatch(updateDirectMessages(messages)));
            } else {
                resp.json().then(json => dispatch(updateErrors([json.errors])));
            }
        })
    }, [])
    return (
        <div>
            
            <div>

            </div>
        </div>
    );
};

export default DirectMessageList