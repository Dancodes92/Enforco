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
    // eslint-disable-next-line
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
      <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm">
          Welcome back <h3>{data.name}</h3>
        </div>
        <div className="container mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/newtask")}
          >
            Create a new task
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/tasks")}
          >
            View all tasks
          </button>

          </div>
      </div>
    );
  }
}
