import React from "react";
import { formatDateShort } from "../../utils/dateHelpers";

const TimeEntry = ({ entry, onUpdate }) => {
  return (
    <div className="time-entry">
      <div className="entry-header">
        <span className="entry-date">{formatDateShort(entry.date)}</span>
        <span className="entry-hours">{entry.hours.toFixed(1)}h</span>
      </div>

      <div className="entry-fields">
        <div className="field-group">
          <label>Start</label>
          <input
            type="time"
            value={entry.startTime}
            onChange={(e) => onUpdate(entry.id, { startTime: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label>End</label>
          <input
            type="time"
            value={entry.endTime}
            onChange={(e) => onUpdate(entry.id, { endTime: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label>Break</label>
          <select
            value={entry.break}
            onChange={(e) =>
              onUpdate(entry.id, { break: Number(e.target.value) })
            }
          >
            <option value={0}>0 min</option>
            <option value={30}>30 min</option>
            <option value={60}>60 min</option>
            <option value={90}>90 min</option>
          </select>
        </div>
      </div>

      <div className="entry-selects">
        <select className="project-select">
          <option value="">Project</option>
          <option value="project1">Project 1</option>
          <option value="project2">Project 2</option>
        </select>

        <select className="task-select">
          <option value="">Task</option>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
        </select>
      </div>
    </div>
  );
};

export default TimeEntry;
