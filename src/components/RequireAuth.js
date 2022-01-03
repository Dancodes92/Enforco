import React, { useEffect } from "react";
import { useAuthQuery } from "../store/features/api/apiSlice";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
 const { data, isLoading, error, isSuccess } = useAuthQuery();

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }
  , [error]);

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    console.log("error", error);
    return <div>Error!</div>

  }

  if (data) {
    return children;
  }

  return children;
}





export default RequireAuth;
