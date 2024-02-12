import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface wrapperProps{
  children: JSX.Element | JSX.Element[]
}


export default function Wrapper( {children}: wrapperProps ) {
  return (
    <>
      <Header />
      {children}
      <Footer/>
    </>
  );
}