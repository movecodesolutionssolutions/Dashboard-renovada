import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.css";

const DarkDatePicker = ({ label, selectedDate, onChange }) => {
  const [startDate, setStartDate] = useState(selectedDate);

  return (
    <div className="flex flex-col">
      <label className="text-gray-400 text-xs mb-2">{label}</label>
      <DatePicker
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
          onChange(date);
        }}
        dateFormat="dd/MM/yyyy"
        className="dark-datepicker"
      />
    </div>
  );
};

export default DarkDatePicker;
