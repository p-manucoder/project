import React, { useState } from "react";
import EmojiPicker from "./EmojiPicker";

const UserChatInput = ({ sendMessage }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputValue = (e) => {
    setInputValue(inputValue + e);
  };
  return (
    <div className="user-chat-footer">
      <div className="user-chat-emoji">
        <EmojiPicker handleEmojiSelect={handleInputValue} />
      </div>
      <div className="user-chat-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setInputValue("");
            sendMessage(inputValue);
          }}
        >
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
      </div>
      <div className="user-chat-send-btn">
        <button
          className="btn btn-primary"
          onClick={(e) => {
            sendMessage(inputValue);
            setInputValue("");
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UserChatInput;
