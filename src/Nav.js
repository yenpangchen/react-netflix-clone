import React, { useState, useEffect } from "react";
import "./Nav.css";
import Avatar from "@material-ui/core/Avatar";

function Nav() {
  const [show, handleShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <img
        className="nav__logo"
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix logo"
      />

      <Avatar
        className="nav__avatar"
        src="https://latesthunts.com/wp-content/uploads/2021/06/Is-Jason-Stathams-Deckard-Shaw-in-the-%E2%80%98Fast-and-Furious-780x470.jpg"
        alt="Netflix logo"
      />
    </div>
  );
}

export default Nav;
