import React from "react";
import { Link, Outlet } from "react-router-dom";

export default function Landing() {
  return (
    <div>
      <h1>The landing page</h1>
      <Link to="/test">
        <p>click this to go to test</p>
      </Link>
      <Outlet />
    </div>
  );
}
