import React from "react";
import Header from "../Layout/Header";
import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <>
      <Header />
      <Outlet></Outlet>
    </>
  );
}
