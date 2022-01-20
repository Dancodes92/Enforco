import React, { useEffect } from "react";
import {
  useGetTasksWhereUserIsEnforcerQuery,
  useAcceptTaskMutation,
} from "../store/features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function Enforcer() {
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetTasksWhereUserIsEnforcerQuery();
  const [updateTask] = useAcceptTaskMutation();

  const onAccept = async taskId => {
    const { data } = await updateTask({
      id: taskId,
      isAccepted: true,
      status: "active",
    });
    refetch();
  };

  const onComplete = async taskId => {
    const { data } = await updateTask({
      id: taskId,
      isFinished: true,
      status: "finished",
    });
    console.log("data", data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log("isError", isError);
    }

    if (isLoading) {
      console.log("isLoading", isLoading);
    }

    if (isSuccess) {
      console.log("isSuccess", isSuccess);
      refetch();
    }

    if (data) {
      console.log("data", data);
    }
  }, [data, error, isError, isLoading, isSuccess, navigate, refetch]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-red-500">
          You are not currently enforcer for any tasks
        </h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => navigate("/home")}
        >
          Go back to home
        </button>
      </div>
    );
  }

  if (isSuccess) {
    // return a table of tasks that are not yet accepted with a button to accept, once button is clicked, the task should be removed from the table of tasks that are not accepted and should be added to the table of tasks that are accepted
    const acceptedTasks = data.filter(
      task => task.isAccepted && !task.isFinished
    );
    const notAcceptedTasks = data.filter(
      task => !task.isAccepted && !task.isFinished
    );

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Accepted Tasks
          </h1>
          <table className="mt-6">
            <thead>
              <tr>
                <th>Task</th>
                <th>Deadline</th>
                <th>Complete</th>
              </tr>
            </thead>
            <tbody>
              {acceptedTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.deadline}</td>
                  <td>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-12"
                      onClick={() => onComplete(task.id)}
                    >
                      Complete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h1 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Not Accepted Tasks
          </h1>
          <table className="mt-6">
            <thead>
              <tr>
                <th>Task</th>
                <th>Deadline</th>
                <th>Completed</th>
              </tr>
            </thead>
            <tbody>
              {notAcceptedTasks.map(task => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.deadline}</td>
                  <td>
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-12"
                      onClick={() => onAccept(task.id)}
                    >
                      Accept
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Enforcer;
