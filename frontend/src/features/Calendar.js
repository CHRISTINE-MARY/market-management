import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa";
import "../styles/calendar.css";

const CustomDateInput = React.forwardRef(({ value, onClick }, ref) => (
  <div className="custom-date-input" onClick={onClick} ref={ref}>
    <span>{value}</span>
    <FaCalendarAlt className="calendar-icon" />
  </div>
));

export default function Calendar({ selectedDate, dateChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => dateChange(date)}
      dateFormat="yyyy-MM-dd"
      showYearDropdown
      scrollableMonthYearDropdown
      customInput={<CustomDateInput />}
    />
  );
}
