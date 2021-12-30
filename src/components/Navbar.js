import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto">
        <h1>Enforco</h1>
        <Link to="/signin">
          <h1>Sign In</h1>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
