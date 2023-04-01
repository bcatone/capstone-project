import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateErrors } from "../redux/error/errorSlice";
import UserCard from "./UserCard";

function DirectMessageList() {
  const [friendId, setFriendId] = useState("");
  const me = useSelector((state) => state.me.value);
  const { id } = useParams();
  const [conversationId, setConversationId] = useState(id);
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const parse = require("html-react-parser");
  const navigate = useNavigate();

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
          setConversationId(messageList.id);
          dispatch(updateDirectMessageLists(messageList.direct_messages));
          setMessages(messageList.direct_messages);
        });
      } else {
        navigate("/");
      }
    });
  }, [dispatch, id, me.id, navigate]);

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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((resp) => {
      if (resp.ok) {
        resp.json().then((message) => setMessages([...messages, message]));
      } else {
        resp.json().then((json) => dispatch(updateErrors([json.errors])));
      }
    });
  };

  return (
    <div className="bg-secondary-subtle bg-gradient text-dark">
      <div className="message-body">
        {messages.map((message) => (
          <div key={message.id}>
            <div>
              <span>
                <strong>{message.sender.username} </strong>
              </span>
              <span> {message.created_at}</span>
            </div>
            <div>{parse(message.message)}</div>
            <hr />
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <ReactQuill
            name="message"
            value={message}
            onChange={handleMessageChange}
          ></ReactQuill>
          <input className="btn btn-primary" type="submit" value="Send" />
        </form>
      </div>
    </div>
  );
}

export default DirectMessageList