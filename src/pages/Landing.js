import React from "react";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <main className="bg-grey flex flex-col justify-center">
      <h1 className="text-center px-10 text-lg">Welcome to Enforco!</h1>
      <p className="text-center">The best motivator to get things done...</p>
      <div>
        <Link to="/signup">
          <p className="text-center m-10">Sign Up</p>
        </Link>
      </div>
    </main>
  );
}
