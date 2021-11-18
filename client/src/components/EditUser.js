import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutChange } from "../actions/loginChange";

axios.defaults.withCredentials = true;

export default function EditUser({ handlePassword, handleChangePassowrd }) {
  const dispatch = useDispatch();

  const useConfirm = (message = null, onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") {
      return;
    }
    if (onCancel && typeof onCancel !== "function") {
      return;
    }
    const confirmAction = () => {
      if (window.confirm(message)) {
        onConfirm();
      } else {
        onCancel();
      }
    };
    return confirmAction;
  };

  const deleteConfirm = () => {
    console.log("삭제했습니다.");
    axios
      .delete("https://server.webmarker.link/users", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        dispatch(logoutChange());
        alert("계정삭제가 정상적으로 처리되었습니다");
      });
  };

  const cancelConfirm = () => console.log("취소했습니다.");
  const confirmDelete = useConfirm(
    "정말 탈퇴하시겠습니까?",
    deleteConfirm,
    cancelConfirm
  );

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div>
        <input
          className="userinfo-password-box"
          type="password"
          placeholder="변경할 Password"
          onChange={handlePassword("newPassword")}
        ></input>
      </div>
      <div>
        <input
          className="userinfo-password-box"
          type="password"
          placeholder="변경할 Password 확인"
          onChange={handlePassword("newPasswordCheck")}
        ></input>
      </div>
      <div>
        <button className="userinfo-btn" onClick={handleChangePassowrd}>
          비밀번호변경
        </button>
      </div>
      <div>
        <button className="signout-btn" onClick={confirmDelete}>
          회원탈퇴
        </button>
      </div>
    </form>
  );
}
