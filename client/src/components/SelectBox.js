import { useState } from "react";

const SelectBox = ({ options, onSelect }) => {
  return (
    <select
      onChange={(e) => {
        onSelect(e.target.value);
      }}
      className="select-box"
    >
      {options.map((option, idx) => (
        <option value={option.value}>{option.name}</option>
      ))}
    </select>
  );
};

export default SelectBox;
