import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InboxOption from "./InboxOption";
import { updateDirectMessageLists } from "../redux/direct_message_lists/directMessageListsSlice";
import { updateMe } from "../redux/me/meSlice";
import { updateErrors } from "../redux/error/errorSlice";
import { updateInbox } from "../redux/inbox/inboxSlice";
import { updateFriends } from "../redux/friends/friendsSlice";
// import {updateMessageLists} from "./MessagesList"

function InboxContainer() {
  const me = useSelector((state) => state.me.value);
  const friends = useSelector((state) => state.friends.value)
  const inbox = useSelector((state) => state.inbox.value);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`/me`)
    .then (resp => {
      if (resp.ok) {
        resp.json().then(me => {
          dispatch(updateInbox(me.conversation_info))
        })
      }
    })
  }, [dispatch, friends])

  return (
    <div className="inbox-container bg-secondary-subtle bg-gradient text-dark">
      <div className="inbox-title">Direct Messages</div>
      {inbox ? inbox.map((info, i) => (
        <InboxOption
          key={i}
          messageInfo={info}
        />
      )) : null}
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
