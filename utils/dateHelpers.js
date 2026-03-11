import {
  format,
  addDays,
  subDays,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
} from "date-fns";

export const formatDate = (date) => {
  return format(date, "EEEE, MMMM d, yyyy");
};

export const formatDateShort = (date) => {
  return format(date, "EEE MMM d");
};

export const getWeekRange = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 0 });
  const end = endOfWeek(date, { weekStartsOn: 0 });
  return { start, end };
};

export const getMonthYear = (date) => {
  return format(date, "MMMM yyyy");
};

export const getDaysInPeriod = (date, viewMode) => {
  if (viewMode === "daily") {
    return [date];
  } else if (viewMode === "weekly") {
    const { start, end } = getWeekRange(date);
    return eachDayOfInterval({ start, end });
  } else {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    return eachDayOfInterval({ start, end });
  }
};

export const navigateDate = (date, direction, viewMode) => {
  if (viewMode === "daily") {
    return direction === "prev" ? subDays(date, 1) : addDays(date, 1);
  } else if (viewMode === "weekly") {
    return direction === "prev" ? subDays(date, 7) : addDays(date, 7);
  } else {
    return direction === "prev" ? subMonths(date, 1) : addMonths(date, 1);
  }
};

export const calculateHours = (startTime, endTime, breakMinutes) => {
  const [startHour, startMin] = startTime.split(":").map(Number);
  const [endHour, endMin] = endTime.split(":").map(Number);

  const startMinutes = startHour * 60 + startMin;
  const endMinutes = endHour * 60 + endMin;

  const diffMinutes = endMinutes - startMinutes - breakMinutes;
  return Math.max(0, diffMinutes / 60);
};
