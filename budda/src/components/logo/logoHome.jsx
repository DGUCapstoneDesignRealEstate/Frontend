import React from "react";
import "./logoHome.css";
import StartBtn from "../startButton/startBtn";
import logo from "../../assets/img/logo.svg";
export default function LogoHome() {
  return (
    <div className="logohomewrapper">
      <div className="logohomecontainer">
        <img src={logo} />
      </div>
      <StartBtn />
    </div>
  );
}
