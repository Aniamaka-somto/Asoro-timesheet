import React from "react";

const TimeSummary = ({ summary }) => {
  return (
    <div className="time-summary">
      <div className="summary-card regular">
        <div className="summary-value">{summary.regular.toFixed(1)}</div>
        <div className="summary-label">Regular</div>
      </div>

      <div className="summary-card overtime">
        <div className="summary-value">{summary.overtime.toFixed(1)}</div>
        <div className="summary-label">Overtime</div>
      </div>

      <div className="summary-card total">
        <div className="summary-value">{summary.total.toFixed(1)}</div>
        <div className="summary-label">Total</div>
      </div>
    </div>
  );
};

export default TimeSummary;
