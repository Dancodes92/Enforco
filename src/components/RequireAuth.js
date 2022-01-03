import React, { useEffect } from "react";
import { useAuthQuery } from "../store/features/api/apiSlice";
import { useLocation, Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { data, isLoading, error } = useAuthQuery();
  const location = useLocation();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error, data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error", error);
    return <div>Error!</div>;
  }

  return data ? (
    children
  ) : (
    <Navigate to="/signin" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
