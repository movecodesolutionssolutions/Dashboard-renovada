import React, { useRef, useEffect } from "react";
import { useField } from "@unform/core";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "5px",
    backgroundColor: "#000",
    fontSize: "16px",
    padding: "4px",
    color: "#fff",
    border: "1px solid #000",
  }),
  option: (provided, state) => ({
    ...provided,
    padding: "10px",
    margin: "2px",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#fff",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "#fff",
  }),
};

const FormSelect = ({ name, label, options, value, onChange, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: "state.value",
      getValue: (ref) => {
        if (rest.isMulti) {
          if (!ref.getValue()) {
            return [];
          }
          return ref.getValue().map((option) => option.value);
        }
        if (!ref.getValue()) {
          return [];
        }
        return ref.getValue().length > 0 ? ref.getValue()[0].value : "";
      },
      setValue: (ref, Value) => {
        if (Value) {
          if (Value instanceof Object) {
            ref.setValue({ ...Value });
          } else {
            const objValue = options.find((opt) => opt.value === Value);
            ref.setValue({ ...objValue });
          }
        } else {
          ref.setValue(null);
        }
      },
    });
  }, [fieldName, registerField, defaultValue, options, error]);
  return (
    <div className="w-full md:w-full px-3 mb-6 md:mb-0 ">
      <label
        className="block uppercase tracking-wide text-gray-400 text-xs mb-2"
        htmlFor={name}
      >
        {label}
      </label>

      <Select
        invalid={error}
        ref={selectRef}
        name={name}
        styles={customStyles}
        classNamePrefix="Select"
        options={options}
        value={options.find((option) => option.value === value)}
        onChange={(selectedOption) => onChange(selectedOption.value)}
      />
      {error && (
        <span style={{ color: "#f00", display: "block" }}>{error}</span>
      )}
    </div>
  );
};

export default FormSelect;
