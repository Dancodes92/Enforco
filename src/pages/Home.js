import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery } from "../store/features/api/apiSlice";

export default function Home(props) {
  const { data, isLoading, error } = useAuthQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error);
      navigate("/signin");
    }
  }, [error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error", error);
    navigate("/signin");
  }

  if (data) {
    return (
      <div className="container mx-auto">
        <div className="container mx-auto">
          Welcome back <h3>{data.name}</h3>
        </div>
      </div>
    );
  }
}
