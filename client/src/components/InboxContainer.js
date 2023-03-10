import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InboxOption from "./InboxOption";
import { updateDirectMessageLists } from "../redux/direct_message_lists/directMessageListsSlice";
// import {updateMessageLists} from "./MessagesList"

function InboxContainer() {
  const me = useSelector((state) => state.me.value);
  const friends = useSelector((state) => state.friends.value);
  const messageLists = useSelector((state) => state.direct_message_lists.value);

  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/users/${me.id}/direct_message_lists`).then((resp) => {
      if (resp.ok) {
        resp.json().then((directMessageLists) => {
          console.log(directMessageLists);
          dispatch(updateDirectMessageLists(directMessageLists));
        });
      }
    });
  }, []);

  return (
    <div className="inbox">
      <div className="inbox-title">Messages</div>
      {messageLists.map((messageList) => <InboxOption key={messageList.id} id={messageList.id} username1={messageList.username1} username2={messageList.username2}/>)}
    </div>
    // <div className="inbox-container">
    //   <div className="inbox-title">Direct Messages</div>
    //   <InboxOption user={me} />
    // </div>
    //     <ul class="list-group">
    //   <li class="list-group-item d-flex justify-content-between align-items-center">
    //     A list item
    //     <span class="badge bg-primary rounded-pill">14</span>
    //   </li>
    //   <li class="list-group-item d-flex justify-content-between align-items-center">
    //     A second list item
    //     <span class="badge bg-primary rounded-pill">2</span>
    //   </li>
    //   <li class="list-group-item d-flex justify-content-between align-items-center">
    //     A third list item
    //     <span class="badge bg-primary rounded-pill">1</span>
    //   </li>
    // </ul>
  );
}

export default InboxContainer;
