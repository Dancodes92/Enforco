import React, { useEffect } from "react";
import {
  useGetTasksWhereUserIsEnforcerQuery,
  useAcceptTaskMutation,
} from "../store/features/api/apiSlice";
import { useNavigate } from "react-router-dom";

// function Enforcer() {
//   const { data, isLoading, isSuccess, isError, error, refetch } =
//     useGetTasksWhereUserIsEnforcerQuery();
//   const [updateTask] = useAcceptTaskMutation();

//   const onAccept = async taskId => {
//     const { data } = await updateTask({
//       id: taskId,
//       isAccepted: true,
//     });
//     console.log("data", data);
//   };

//   const onComplete = async taskId => {
//     const { data } = await updateTask({
//       id: taskId,
//       isFinished: true,
//     });
//     console.log("data", data);
//   };

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (isError) {
//       console.log("isError", isError);
//     }

//     if (isLoading) {
//       console.log("isLoading", isLoading);
//     }

//     if (isSuccess) {
//       console.log("isSuccess", isSuccess);
//       refetch();
//     }

//     if (data) {
//       console.log("data", data);
//     }
//   }, [data, error, isError, isLoading, isSuccess, navigate, refetch]);

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (isError) {
//     // You are not currently enforcer for any tasks
//     // return styled to be centered and have a button to go back to home
//     return (
//       <div>
//         <h1>You are not currently enforcer for any tasks</h1>
//         <button onClick={() => navigate("/home")}>Go back to home</button>
//       </div>
//     );
//   }

//   if (isSuccess) {
//     // return the tasks that are accepted and not finished and return the tasks that are not accepeted and not finished
//     const acceptedTasks = data.filter(
//       task => task.isAccepted && !task.isFinished
//     );
//     const notAcceptedTasks = data.filter(
//       task => !task.isAccepted && !task.isFinished
//     );

//     // return styled in tables and have buttons to accept and complete
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center">
//         <h1>Accepted Tasks</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Deadline</th>
//               <th>Accept</th>
//               <th>Complete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {acceptedTasks.map(task => (
//               <tr key={task.id}>
//                 <td>{task.name}</td>
//                 <td>{task.deadline}</td>
//                 <td>
//                   <button onClick={() => onAccept(task.id)}>Accept</button>
//                 </td>
//                 <td>
//                   <button onClick={() => onComplete(task.id)}>Complete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <h1>Not Accepted Tasks</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Task</th>
//               <th>Deadline</th>
//               <th>Accept</th>
//               <th>Complete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {notAcceptedTasks.map(task => (
//               <tr key={task.id}>
//                 <td>{task.name}</td>
//                 <td>{task.deadline}</td>
//                 <td>
//                   <button onClick={() => onAccept(task.id)}>Accept</button>
//                 </td>
//                 <td>
//                   <button onClick={() => onComplete(task.id)}>Complete</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   }
// }

// export default Enforcer;

// rework the above code to display the tasks that are accepted and not finished in a table styled like other components in the app and have a button to complete accepted tasks. another table to display the tasks that are not accepted and not finished in a table styled like other components in the app and have a button to accept tasks. the button to accept a task should be styled differently than the button to complete a task. on click of the button to accept a task, the task whould be animated to be and removed from the table of tasks that are not accepted and transitioned smoothly into table of tasks that are accepted. on click of the button to complete a task, the task whould be animated to be and removed from the table of tasks that are accepted and transitioned smoothly into table of tasks that are finished.

// rework the above code to display the tasks that are accepted and not finished in a table styled like other components in the app and have a button to complete accepted tasks. another table to display the tasks that are not accepted and not finished in a table styled like other components in the app and have a button to accept tasks.

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
    refetch()
    // update the task that is accepted
    console.log("data", data);
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
    return <div>Loading...</div>;
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
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-12"  onClick={() => onComplete(task.id)}>
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
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-12"  onClick={() => onAccept(task.id)}>
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
