import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import RequireAuth from "./components/RequireAuth";
import NewTask from "./pages/NewTask";
import NotFound from "./pages/NotFound";
import AllTasks from "./pages/AllTasks";

function TheRoutes(props) {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route
        path="/home"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route
        path="/newtask"
        element={
          <RequireAuth>
            <NewTask />
          </RequireAuth>
        }
      />
      <Route
        path="/tasks"
        element={
          <RequireAuth>
            <AllTasks />
          </RequireAuth>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default TheRoutes;
