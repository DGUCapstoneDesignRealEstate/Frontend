import React from "react";
import Header from "../../components/header/header";
import LogoHome from "../../components/logo/logoHome";
import FooterHome from "../../components/footer/footerStart";
import "./startPage.css";

export default function StartPage() {
  return (
    <>
      <div className="startbackground" />
      <LogoHome />
      <Header title="" />
      <FooterHome />
    </>
  );
}
