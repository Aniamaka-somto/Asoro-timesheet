import React from "react";

const TimesheetHeader = () => {
  return (
    <header className="timesheet-header">
      <div className="header-left">
        <div className="logo">
          <svg
            className="logo-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>
        <div className="title-section">
          <h1>Timesheet</h1>
          <p className="subtitle">Track your work hours</p>
        </div>
      </div>
      <button className="notification-btn">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>
    </header>
  );
};

export default TimesheetHeader;
