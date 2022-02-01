import React from "react";

const TaskNameAndDescription = ({ taskName, description, onTaskNameChange, onDescriptionChange, onNextStep }) => {

  const onTaskNameChangeHandler = (e) => {
    onTaskNameChange(e.target.value);
  };

  const onDescriptionChangeHandler = (e) => {
    onDescriptionChange(e.target.value);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 sm:px-6 lg:px-10">
      <div className="w-full max-w-lg">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Create A New Task
        </h1>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="taskName"
            >
              Task Name
            <input
              type="text"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="taskName"
              placeholder="Enter task name"
              value={taskName}
              onChange={onTaskNameChangeHandler}
              />
              </label>

            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="description"
            >
              Description
              <textarea
                value={description}
                onChange={onDescriptionChangeHandler}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                placeholder="What are you going to accomplish?"
              />
            </label>
          </div>
          <div className="w-full px-3 flex justify-center items-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={onNextStep}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNameAndDescription;
