import React from "react";

const UserChatLabel = ({ chat }) => {
  return (
    <div className="d-flex p-2   h-100px user-name-label">
      <div className="img img-fluid person-profile-pic-chat">
        <img src="/images/branches.png" className="rounded-circle" />
      </div>
      <div className="person-profile-name align-items-middle ms-3">
        {chat.userName || ""}
      </div>
    </div>
  );
};

export default UserChatLabel;
