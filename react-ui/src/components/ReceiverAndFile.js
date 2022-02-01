import React from "react";

function ReceiverAndFile({
  onReceiverChange,
  onAddFileChange,
  receiver,
  onSubmit,
  onPrevStep,
}) {
  const onReceiverChangeHandler = e => {
    onReceiverChange(e.target.value);
  };

  const addImage = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (readerEvent) => {
      onAddFileChange(readerEvent.target.result);
    }
  }

const filePickerRef = null;

  const canSubmit = receiver.length > 0;


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
              htmlFor="receiver"
            >
              Receiver
            </label>
            <input
              type="email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="receiver"
              placeholder="Enter receiver email"
              value={receiver}
              onChange={onReceiverChangeHandler}
              required
            />

            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="file"
            >
              File
            </label>
            <input
              type="file"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="file"
              ref={filePickerRef}
              onChange={addImage}
            />
          </div>
          <div className="w-full px-3 flex justify-center items-center">
            <button
              className="ml-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4"
              type="button"
              onClick={onPrevStep}
            >
              Back
            </button>

            {canSubmit ? (
              <button
                className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={onSubmit}
              >
                Submit
              </button>
            ) : (
              <div className=" bg-gray-200 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ">
                Submit
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiverAndFile;
