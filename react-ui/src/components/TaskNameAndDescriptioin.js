import React from "react";

const TaskNameAndDescription = ({
  taskName,
  description,
  onTaskNameChange,
  onDescriptionChange,
  onNextStep,
}) => {
  const onTaskNameChangeHandler = e => {
    onTaskNameChange(e.target.value);
  };

  const onDescriptionChangeHandler = e => {
    onDescriptionChange(e.target.value);
  };

  const canMoveToNextStep = [taskName, description].every(
    item => item.length > 0
  );

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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white text-xl"
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
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                placeholder="What are you going to accomplish?"
              />
              <div className="w-full bg-gray-200 rounded-full">
                <div
                  className="
                    w-0
                    p-1
                    text-xs
                    font-medium
                    leading-none
                    text-center text-blue-100
                    bg-blue-600
                    rounded-full
                    mb-3
                  "
                ></div>
              </div>
            </label>
          </div>
          <div className="w-full px-3">
            {canMoveToNextStep ? (
              <div className="w-full px-3 flex justify-center items-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={onNextStep}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="w-full px-3 flex justify-center items-center">
                <div className="ml-4 bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4">
                  Next
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskNameAndDescription;
