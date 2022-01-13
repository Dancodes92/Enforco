import React, { useEffect } from "react";
import {
  useGetTasksWhereUserIsEnforcerQuery,
  useAcceptTaskMutation,
} from "../store/features/api/apiSlice";
import { useNavigate } from "react-router-dom";

function Enforcer() {
  const { data, isLoading, isSuccess, isError, error, refetch } =
    useGetTasksWhereUserIsEnforcerQuery();
  const [updateTask] = useAcceptTaskMutation();

  const onAccept = async taskId => {
    const { data } = await updateTask({
      id: taskId,
      isAccepted: true,
    });
    console.log("data", data);
  };

  const onComplete = async taskId => {
    const { data } = await updateTask({
      id: taskId,
      isFinished: true,
    });
    console.log("data", data);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      console.log("isError", isError);
      navigate("/404");
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
    return <div>Loading...</div>;
  }

  if (isError) {
    console.log("error", error);
    navigate("/404");
  }

  if (isSuccess) {
    // return the tasks data.user.name as users task, and the tasks data.deadline as deadline, and the tasks data.description as description, and a button to accept the task as enforcer, and a button to reject the task as enforcer, and a button to complete the task as enforcer
    let deadline = data[0].deadline;
    // turn the deadline into a date object without time
    deadline = new Date(deadline);
    deadline.setHours(0, 0, 0, 0);
    // turn the deadline into a string
    deadline = deadline.toString();
    const formattedDeadline = deadline.slice(0, 15);

    let deadlineDate = new Date(deadline);

    console.log(formattedDeadline);
    console.log(data);
    return (
      <div>
        {data.map(task => (
          <div key={task.id}>
            <h3>{task.user.name}</h3>
            <h3>{task.deadline}</h3>
            <h3>{task.description}</h3>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onAccept(task.id)}
            >
              Accept
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => onComplete(task.id)}
            >
              Complete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

export default Enforcer;
