import React from "react";
import { Routes, Route } from "react-router-dom";
import Another from "./pages/Another";
import Landing from "./pages/Landing";
import Test from "./pages/Test";


function routes() {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
          <Route path="/test" element={<Test />} />
          <Route path="/another" element={<Another />} />
      </Routes>
  );
}

export default routes;
