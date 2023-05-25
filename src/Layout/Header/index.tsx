import React from "react";
import "./Header.css";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { tokenActions } from "../../store/tokenSlice";
import { Link } from "react-router-dom";
export default function Header() {
  const token = useAppSelector((state) => state.token.name);
  const dispatch = useAppDispatch();
  function logoutHandler() {
    dispatch(tokenActions.removeToken());
    window.localStorage.removeItem("token");
  }
  return (
    <div className="header-container">
      <div>
        <Link to="/">
          <span style={{ color: "rgb(0, 305, 120)" }}>ARTIST</span> SEARCHER
        </Link>
      </div>
      {token ? (
        <button className="logoutBtn" onClick={logoutHandler}>
          LOGOUT
        </button>
      ) : null}
    </div>
  );
}
