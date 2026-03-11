import React, { useState, useMemo } from "react";
import TimesheetHeader from "./components/TimesheetHeader";
import ViewToggle from "./components/ViewToggle";
import DateNavigator from "./components/DateNavigator";
import TimeEntry from "./components/TimeEntry";
import TimeSummary from "./components/TimeSummary";
import SignatureSection from "./components/SignatureSection";
import { getDaysInPeriod, calculateHours } from "../utils/dateHelpers";
import "./App.css";

function App() {
  const [viewMode, setViewMode] = useState("daily");
  const [currentDate, setCurrentDate] = useState(new Date());

  // Generate sample time entries
  const [timeEntries, setTimeEntries] = useState(() => {
    const days = getDaysInPeriod(new Date(), "monthly");
    return days.map((day, index) => ({
      id: `entry-${index}`,
      date: day,
      startTime: "09:00",
      endTime: "17:00",
      break: 60,
      project: "",
      task: "",
      hours: 7.0,
    }));
  });

  const filteredEntries = useMemo(() => {
    const days = getDaysInPeriod(currentDate, viewMode);
    return timeEntries.filter((entry) =>
      days.some((day) => day.toDateString() === entry.date.toDateString()),
    );
  }, [timeEntries, currentDate, viewMode]);

  const summary = useMemo(() => {
    const total = filteredEntries.reduce((sum, entry) => sum + entry.hours, 0);
    return {
      regular: total,
      overtime: 0,
      total: total,
    };
  }, [filteredEntries]);

  const handleViewChange = (mode) => {
    setViewMode(mode);
  };

  const handleDateChange = (date) => {
    setCurrentDate(date);
  };

  const handleEntryUpdate = (id, updates) => {
    setTimeEntries((prev) =>
      prev.map((entry) => {
        if (entry.id === id) {
          const updated = { ...entry, ...updates };

          // Recalculate hours if time values changed
          if (
            updates.startTime ||
            updates.endTime ||
            updates.break !== undefined
          ) {
            const start = updated.startTime || entry.startTime;
            const end = updated.endTime || entry.endTime;
            const breakTime =
              updated.break !== undefined ? updated.break : entry.break;

            updated.hours = calculateHours(start, end, breakTime);
          }
          return updated;
        }
        return entry;
      }),
    );
  };

  const handleSubmit = () => {
    alert("Timesheet submitted!");
  };

  return (
    <div className="app">
      <TimesheetHeader />

      <nav className="main-nav">
        <button className="nav-item">Submissions</button>
        <button className="nav-item active">Timesheet</button>
        <button className="nav-item">Tasks</button>
        <button className="nav-item">Expense</button>
        <button className="nav-item">Review</button>
        <button className="nav-item">Builder</button>
      </nav>

      <main className="main-content">
        <div className="timesheet-container">
          <ViewToggle viewMode={viewMode} onViewChange={handleViewChange} />

          <DateNavigator
            currentDate={currentDate}
            viewMode={viewMode}
            onDateChange={handleDateChange}
          />

          <div className="time-entries-section">
            <h3 className="section-title">Time Entries</h3>

            <div className="entries-list">
              {filteredEntries.map((entry) => (
                <TimeEntry
                  key={entry.id}
                  entry={entry}
                  onUpdate={handleEntryUpdate}
                />
              ))}
            </div>
          </div>

          <TimeSummary summary={summary} />

          <SignatureSection onSubmit={handleSubmit} />
        </div>
      </main>
    </div>
  );
}

export default App;
