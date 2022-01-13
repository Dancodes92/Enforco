import React from "react";
import { useGetTasksQuery } from "../store/features/api/apiSlice";

function AllTasks() {
  const { data, isLoading, error } = useGetTasksQuery();
  // list of tasks
  const tasks = data;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.log("error", error);
  }

  console.log("tasks", data);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          All Tasks
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white shadow rounded-lg">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Task</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Deadline</th>
                <th className="px-4 py-2">Enforcer</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks?.map(task => (
                <tr key={task.id} className={task.isAccepted ? "" : "bg-red-200"}>
                  <td className="border px-4 py-2">{task.name}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  <td className="border px-4 py-2">{task.deadline}</td>
                  <td className="border px-4 py-2">{task.enforcer.email}</td>
                  <td className="border px-4 py-2">{task.isAccepted ? "Active" : "awaiting enforcer acceptance"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllTasks;
