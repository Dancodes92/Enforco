import React from "react";

function Deadline({ deadline, enforcer, onDeadlineChange, onEnforcerChange, onNextStep, onPrevStep }) {

  const onDeadlineChangeHandler = (e) => {
    onDeadlineChange(e.target.value);
  };

  const onEnforcerChangeHandler = (e) => {
    onEnforcerChange(e.target.value);
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
              htmlFor="deadline"
            >
              Deadline
            </label>
            <input
              // do not allow user to enter date in the pasts

              type="date"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
              id="deadline"
              placeholder="Enter deadline"
              value={deadline}
              onChange={onDeadlineChangeHandler}
            />
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="enforcer"
            >
              Enforcer
            </label>
            <input
              type="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="enforcer"
              placeholder="Enter enforcer email"
              value={enforcer}
              onChange={onEnforcerChangeHandler}
            />
          </div>
          <div className="w-full px-3 flex justify-center items-center">
            <button className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="button"
              onClick={onPrevStep}
            >
              Back
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={onNextStep}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deadline;
