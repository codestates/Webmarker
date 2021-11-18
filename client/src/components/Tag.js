import React, { useState, useEffect } from "react";
import styled from "styled-components";

export const TagsInput = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  width: 70%;
  height: 3.2rem;
  padding: 0 8px;
  border: 0.1rem solid #acacac;
  box-shadow: inset 0.01rem 0.01rem rgba(0, 0, 0, 0.8);
  border-radius: 0.3rem;
  margin: 0.3rem;
  overflow: auto;

  > ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
    background-color: transparent;

    > .tag {
      width: auto;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      padding: 0 8px;
      font-size: 14px;
      list-style: none;
      border-radius: 6px;
      margin: 0 8px 8px 0;
      background: #4000c7;
      > .tag-close-icon {
        display: block;
        width: 16px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        font-size: 14px;
        margin-left: 8px;
        color: #4000c7;
        border-radius: 50%;
        background: #fff;
        cursor: pointer;
      }
      > .tag-title {
        background-color: #4000c7;
      }
    }
  }

  > input {
    flex: 1;
    border: none;
    height: 46px;
    font-size: 14px;
    padding: 4px 0 0 0;
    background-color: transparent;
    :focus {
      outline: transparent;
    }
  }

  &:focus-within {
    outline: 0.12rem solid #641eac;
  }
`;

export default function Tag({ values, onChange }) {
  const [tags, setTags] = useState([]);
  const removeTags = (indexToRemove) => {
    let tmpArr = [...tags];
    setTags(
      tmpArr.filter((el) => {
        return indexToRemove !== tags.indexOf(el);
      })
    );
  };
  //태그제거함수

  const addTags = (event) => {
    if (tags.includes(event.target.value)) {
      return;
    } else if (event.target.value === "") {
      return;
    } else {
      let tmpArr = [...tags, event.target.value];
      setTags(tmpArr);
      event.target.value = "";
    }
  };
  //태그추가함수

  useEffect(() => {
    if (typeof onChange === "function") {
      onChange(tags);
    }
  }, [onChange, tags]);


  return (
    <>
      <TagsInput>
        <ul id="tags">
          {(values ?? tags).map((tag, index) => (
            <li key={index} className="tag">
              <span className="tag-title">{tag}</span>
              <span
                className="tag-close-icon"
                onClick={() => removeTags(index)}
              >
                x
              </span>
            </li>
          ))}
        </ul>
        <input
          className="tag-input"
          type="text"
          onKeyUp={(e) => {
            if (e.key === "Enter") addTags(e);
          }}
          placeholder="엔터로 태그 입력"
        />
      </TagsInput>
    </>
  );
}
