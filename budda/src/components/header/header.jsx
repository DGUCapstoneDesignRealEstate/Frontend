import React from "react";
import "./header.css";
import Budda from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header(props) {
  const nav = useNavigate();
  return (
    <div className="headercontainer">
      <div className="headerbox">
        <img src={Budda} alt="로고이미지" width={80} onClick={() => nav("/")} />
        <p className="headertitle">{props.title}</p>
      </div>
    </div>
  );
}
