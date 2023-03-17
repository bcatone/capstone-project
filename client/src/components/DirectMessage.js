import React from "react";
import ReactQuill from "react-quill";

function DirectMessage({ message }) {
  const parse = require("html-react-parser");

  return (
    <div>
        <div>
          <span>
            <strong>{message.sender.username}</strong>
          </span>
        </div>
        <div>{parse(message.message)}</div>
      </div>
  );
}

export default DirectMessage;
