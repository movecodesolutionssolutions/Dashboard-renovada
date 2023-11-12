import React from "react";
import { StyledDatePicker } from "./styles";

const DatePickerInput = ({ placeholder, selectedDate, onChange }) => {
  return (
    <StyledDatePicker
      selected={selectedDate}
      onChange={(date) => onChange(date)}
      dateFormat="dd/MM/yyyy"
      placeholderText={placeholder}
      value={selectedDate}
    />
  );
};

export default DatePickerInput;
