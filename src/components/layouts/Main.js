import React, { Fragment } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Main() {
  return (
    <Fragment>
      <Header></Header>
      <Outlet></Outlet>
    </Fragment>
  );
}
