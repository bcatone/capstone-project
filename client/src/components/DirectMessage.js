import React from "react";

function DirectMessage({ message }) {
  return (
    <div>
        <div className="row">
        <div className="col">{message.username}</div>
        <div className="col">{message.created_at}</div>
        </div>
      
    </div>
  );
}

export default DirectMessage;
