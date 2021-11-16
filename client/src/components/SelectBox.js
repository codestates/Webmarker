import { useState } from "react";

const SelectBox = ({ options, onSelect }) => {
  const [visibleList, setVisibleList] = useState(false);
  const [selectIdx, setSelectIdx] = useState(0);

  const toggleVisible = () => {
    setVisibleList(!visibleList);
  };
  return (
    <div className="select-box">
      <div onClick={toggleVisible}>{options[selectIdx].name}</div>
      {visibleList ? (
        <div className="hidden-list">
          {options.map((option, idx) => (
            <div
              onClick={() => {
                onSelect(option.value);
                setVisibleList(false);
                setSelectIdx(idx);
              }}
            >
              {option.name}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SelectBox;
