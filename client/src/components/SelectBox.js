import { useState } from "react";

const SelectBox = ({ options, onSelect }) => {
  const [selectIdx, setSelectIdx] = useState(0);

  return (
    <select className="select-box">
      {options.map((option, idx) => (
        <option
          onClick={() => {
            onSelect(option.value);
            setSelectIdx(idx);
          }}
        >
          {option.name}
        </option>
      ))}
    </select>
  );
};

export default SelectBox;
