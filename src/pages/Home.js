import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery, useGetTasksQuery } from "../store/features/api/apiSlice";
import TaskClosestToDeadline from "../components/TaskClosestToDeadline";

export default function Home() {
  const { data, isLoading, error } = useAuthQuery();
  const navigate = useNavigate();
  const {
    data: tasksData,
    isLoading: tasksIsLoading,
    error: tasksError,
    isUninitialized,
    refetch,
  } = useGetTasksQuery();

  const refreshTasks = () => {
    if (isUninitialized) {
      navigate("/login");
    }
    refetch();
  };

  useEffect(() => {
    if (isUninitialized) {
      navigate("/login");
    }

    if (tasksError) {
      console.log("tasksError", tasksError);
    }

    if (tasksIsLoading) {
      console.log("tasksIsLoading", tasksIsLoading);
    }

    if (error) {
      console.log("error", error);
      navigate("/404");
    }

    if (isLoading) {
      console.log("isLoading", isLoading);
    }

    if (tasksData) {
      console.log("tasksData", tasksData);
      refetch();
    }
  }, [
    data,
    error,
    isLoading,
    isUninitialized,
    navigate,
    tasksData,
    tasksError,
    tasksIsLoading,
    refetch,
  ]);

  // if (tasksError) {
  //   console.log(tasksError);
  // }

  // if (tasksIsLoading) {
  //   return <div>Loading...</div>;
  // }

  //copy the tasksData object
  const tasks = tasksData ? [...tasksData] : [];

  const closestTask = tasks?.find(
    task =>
      task.deadline ===
      tasks?.reduce((min, p) => (p.deadline < min.deadline ? p : min)).deadline
  ); //  ?. is used to check if the task is not null

  // useEffect(() => {
  //   if (isLoading) {
  //     return;
  //   }

  //   if (error) {
  //     console.log(error);
  //     navigate("/404");
  //   }

  //   if (isUninitialized) {
  //     navigate("/login");
  //   }
  // }, [isLoading, error, isUninitialized, navigate]);

  if (data) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm text-center">
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
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-12"
            onClick={() => navigate("/tasks")}
          >
            View all tasks
          </button>
          <TaskClosestToDeadline tasks={closestTask} />
        </div>
      </div>
    );
  }
}
