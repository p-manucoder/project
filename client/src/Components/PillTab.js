import React from "react";

const PillTab = ({ text, isSelected }) => {
  return (
    <div
      className={`${text} pillTab text-center ${
        isSelected ? "selectedPill" : " "
      }`}
    >
      {text}
    </div>
  );
};

export default PillTab;
