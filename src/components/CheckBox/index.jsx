import React, { useState } from "react";

const Checkbox = ({ label, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    if (onChange) {
      onChange(!isChecked);
    }
  };

  return (
    <div className="mt-2">
      <label className="inline-flex items-center">
        <input
          type="checkbox"
          className="form-checkbox h-5 w-5 text-blue-500"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <span className="ml-2 text-white">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
