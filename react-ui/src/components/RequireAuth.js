import React, { useEffect } from "react";
import { useAuthQuery } from "../store/features/api/apiSlice";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { isLoading, isFetching, isSuccess, isUninitialized } = useAuthQuery();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isUninitialized) {
      navigate("/login");
    }
  }, [isUninitialized, navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return isSuccess ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ path: location.pathname }} />
  );
}

export default RequireAuth;
