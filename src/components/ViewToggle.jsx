import React from "react";

const ViewToggle = ({ viewMode, onViewChange }) => {
  const modes = ["daily", "weekly", "monthly"];

  return (
    <div className="view-toggle">
      {modes.map((mode) => (
        <button
          key={mode}
          className={`toggle-btn ${viewMode === mode ? "active" : ""}`}
          onClick={() => onViewChange(mode)}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default ViewToggle;
