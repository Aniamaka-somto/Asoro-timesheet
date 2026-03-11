import React from "react";
import {
  formatDate,
  getWeekRange,
  getMonthYear,
  navigateDate,
} from "../../utils/dateHelpers";

const DateNavigator = ({ currentDate, viewMode, onDateChange }) => {
  const getDateDisplay = () => {
    if (viewMode === "daily") {
      return formatDate(currentDate);
    } else if (viewMode === "weekly") {
      const { start, end } = getWeekRange(currentDate);
      return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    } else {
      return getMonthYear(currentDate);
    }
  };

  const handlePrev = () => {
    onDateChange(navigateDate(currentDate, "prev", viewMode));
  };

  const handleNext = () => {
    onDateChange(navigateDate(currentDate, "next", viewMode));
  };

  return (
    <div className="date-navigator">
      <button className="nav-btn" onClick={handlePrev}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <div className="date-display">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>{getDateDisplay()}</span>
      </div>
      <button className="nav-btn" onClick={handleNext}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
};

export default DateNavigator;
