import React from "react";

const ChatMessage = ({ msg, userId }) => {
  return (
    <div className="my-3">
      <div
        className={
          msg.sentBy == userId || msg.senderId == userId
            ? "msg-right"
            : "msg-left"
        }
      >
        <div
          className="   rounded    py-2 px-4  me-3 ms-3 d-inline "
          style={
            msg.sentBy == userId || msg.senderId == userId
              ? {
                  backgroundColor: "#B39CD0",
                  border: "1px solid #FBEAFF",
                  color: "#FBEAFF",
                }
              : {
                  backgroundColor: "#FBEAFF ",
                  border: "1px solid  #B39CD0",
                  color: "#B39CD0",
                }
          }
        >
          {msg.text}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
