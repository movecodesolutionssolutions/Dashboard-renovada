import React from "react";
import PropTypes from "prop-types";

const DateInput = ({ label, id, value, onChange }) => {
  return (
    <div className="w-full md:w-full px-3 md:mb-0 ">
      <label
        className="block uppercase tracking-wide text-gray-700 text-xs  mb-2"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className="appearance-none block w-full bg-gray-100 text-gray-700 border border-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        id={id}
        type="date"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateInput;
