// import React from "react";
// import { useSelector } from "react-redux";

// export default class ChatBox extends React.Component {
//   componentDidMount() {
//     consumer.subscriptions.create({
//       channel: "ChatChannel",
//       username: "TestUser",
//     }),
//       {
//         connected: () => console.log("connected"),
//         disconnected: () => console.log("disconnected"),
//         received: (data) => console.log(data),
//       };
//   }

//   componentWillUnmount() {
//     consumer.disconnect();
//   }

//   state = {
//     content: 'Hi!',
//     username: `${me.username}`
//   }

//   handleSubmit = () => {
//     fetch('http://localhost:3000/messages', {
//       method: 'POST',
//       body: JSON.stringify(this.state)
//     })
//   }
// }
