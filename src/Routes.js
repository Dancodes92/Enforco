import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RequireAuth from "./components/RequireAuth";
import NewTask from "./pages/NewTask";

function TheRoutes(props) {


  return (
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/newtask" element={<RequireAuth><NewTask /></RequireAuth>} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
  );
}

export default TheRoutes;
