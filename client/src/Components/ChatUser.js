import React from "react";

const ChatUser = ({ chat, isCurrentUser }) => {
  return (
    <div
      className="left-screen-chat-users p-2 d-flex gap-3 h-100px"
      style={isCurrentUser ? { backgroundColor: "#CCB4E9" } : {}}
    >
      <div className="img img-fluid person-profile-pic-chat">
        <img src="/images/branches.png" className="rounded-circle" />
      </div>
      <div className="person-profile-name align-items-middle">
        {chat.userName}
      </div>
    </div>
  );
};

export default ChatUser;
