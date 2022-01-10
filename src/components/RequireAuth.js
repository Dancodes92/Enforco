import React, { useEffect } from "react";
import { useAuthQuery } from "../store/features/api/apiSlice";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

function RequireAuth({ children }) {
  const { data, isLoading, error, isFetching, isSuccess, isUninitialized } = useAuthQuery();
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

  // if (error) {
  //   return (
  //     <div>
  //       <Navigate to="/login" replace state={{ path: location.pathname }} />
  //     </div>
  //   )
  // }

  if (isFetching) {
    return <div>Fetching...</div>;
  }

  return isSuccess ? children : <div>Not authenticated</div>;

  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (error) {
  //     console.log(error);
  //     navigate("/404");
  //   }
  // }, [error, data]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   console.log("error", error);
  //   navigate("/404");
  // }

  // return data ? (
  //   children
  // ) : (
  //   <Navigate to="/signin" replace state={{ path: location.pathname }} />
  // );
}

export default RequireAuth;
