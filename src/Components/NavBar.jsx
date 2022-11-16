import React from 'react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  //Redirect to different pages.
  const navigate = useNavigate();

  //Redirects to login page
  const logout = () => {
    localStorage.removeItem("userData");
    navigate("/");
  }

  return (
    <>
      <nav className="user-nav">
        <FontAwesomeIcon icon={faListCheck} className="list-icon" />
        <h1 className="page-title">Todo List</h1>
        <button className="logout-btn" onClick={logout}>
          <FontAwesomeIcon icon={faRightFromBracket} className="logout-icon" />
          Logout
        </button>
      </nav>
    </>
  );
}

export default NavBar