import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateErrors } from "../redux/error/errorSlice";
import { updateDirectMessageLists } from "../redux/direct_message_lists/directMessageListsSlice";
import ReactQuill from "react-quill";

function DirectMessageList() {
  const [friendId, setFriendId] = useState("");
  const me = useSelector((state) => state.me.value);
  const errors = useSelector((state) => state.error.value);
  const messageList = useSelector((state) => state.direct_message_lists.value);
  const { id } = useParams();
  const [conversationId, setConversationId] = useState(id)
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const parse = require("html-react-parser");

  useEffect(() => {
    console.log();
    fetch(`/direct_message_lists/${id}/`).then((resp) => {
      if (resp.ok) {
        resp.json().then((messageList) => {
          const otherId =
            messageList.user_2_id === me.id
              ? messageList.user_1_id
              : messageList.user_2_id;
          setFriendId(otherId);
          setConversationId(messageList.id)
          dispatch(updateDirectMessageLists(messageList.direct_messages));
          setMessages(messageList.direct_messages)
        });
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  }, [dispatch, id]);

  const handleMessageChange = (value) => {
    setMessage(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      message: message,
      direct_message_list_id: conversationId,
      sender_id: me.id,
      receiver_id: friendId,
    };

    fetch("/direct_messages", {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
        }
    )
    .then(resp => {
        if (resp.ok) {
            resp.json().then(message => setMessages([...messages, message]))
        } else {
          resp.json().then(json => dispatch(updateErrors([json.errors])))
        }
    })

  };

  return (
    <div>
        <div>
        {messages.map(message => <div key={message.id}>{parse(message.message)}</div>)}
        </div>
      <div>
        <form onSubmit={handleSubmit}>
          <ReactQuill
            name="message"
            value={message}
            onChange={handleMessageChange}
          ></ReactQuill>
          <input type="submit" value="Send" />
          <p>{errors}</p>
        </form>
      </div>

      {/* <CreateDirectMessageForm conversationId={id} senderId={me.id} receiverId={friendId}/> */}
    </div>
  );
}

export default DirectMessageList;
