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

  // me.conversation_info.map((info) => console.log(info.direct_message_id));

  return (
    <div className="inbox">
      <div className="inbox-title">Messages</div>
      {me.conversation_info ? me.conversation_info.map((info, i) => (
        <InboxOption
          key={i}
          messageInfo={info}
        />
      )) : null}
    </div>
  );
}

export default InboxContainer;
