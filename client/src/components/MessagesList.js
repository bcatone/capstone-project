// import React from "react";
// import { useParams } from "react-router";
// //import { selectMessagesByTeam } from "../redux/messages/messagesSlice";
// import { useSelector } from "react-redux";
// //import { updateFriendSuggestions } from "../redux/friend_suggestions/friendSuggestionsSlice";
// import MessageItem from "./MessageItem";

// const MessagesList = () => {
//   const cable = useContext(ActionCableContext);
//   const [channel, setChannel] = useState(null);
//   const { teamId } = useParams();
//   const currentUserId = useSelector((state) => state.me.value);

//   useEffect(() => {
//     const channel = cable.subscriptions.create({
//       channel: "MessagesChannel",
//       id: teamId,
//     });

//     const sendMessage = (content) => {
//       const data = { teamId, userId, content };
//       channel.send(data);
//     };

//     setChannel(channel);

//     const renderedMessages =
//       messages &&
//       messages.map((message) => (
//         <MessageItem key={message.id} message={message} />
//       ));

//     return () => {
//       channel.unsubscribe();
//     };
//   }, [teamId]);

//   return (
//     <div>
//       {renderedMessages}
//       <Editor sendMessage={sendMessage} />
//     </div>
//   );
// };

// export default MessagesList;
