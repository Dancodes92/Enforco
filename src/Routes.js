import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Users from "./pages/Users";


function routes() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/users" element={<Users />} />
      </Routes>
  );
}

export default routes;
