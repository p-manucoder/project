import React, { useState } from "react";
import Picker from "emoji-picker-react";

const EmojiPicker = ({ handleEmojiSelect }) => {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <div>
      <div
        role={"button"}
        className="fs-4"
        onClick={() => setIsClicked(!isClicked)}
      >
        😀
      </div>
      {isClicked && <EmojiBox handleEmojiSelect={handleEmojiSelect} />}
    </div>
  );
};

const EmojiBox = ({ handleEmojiSelect }) => {
  const [chosenEmoji, setChosenEmoji] = useState(false);

  const onEmojiClick = (event, emojiObject) => {
    handleEmojiSelect(emojiObject.emoji);
  };

  return (
    <div style={{ position: "absolute" }}>
      <Picker onEmojiClick={onEmojiClick} />
    </div>
  );
};
export default EmojiPicker;
