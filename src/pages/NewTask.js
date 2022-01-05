import React, { useState, useRef } from "react";
import { useAddTaskMutation } from "../store/features/api/apiSlice";

function NewTask() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [enforcer, setEnforcer] = useState("");
  const [receiver, setReceiver] = useState("");
  const filePickerRef = null;
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isImage, setIsImage] = useState(false);

  const [addTask, { loading: mutationLoading, error: mutationError }] =
    useAddTaskMutation();

  const addFile = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = readerEvent => {
      setFile(readerEvent.target.result);
    };
  };

  const onTaskNameChange = e => {
    setTaskName(e.target.value);
  };
  const onDescriptionChange = e => {
    setDescription(e.target.value);
  };
  const onDeadlineChange = e => {
    setDeadline(e.target.value);
  };
  const onEnforcerChange = e => {
    setEnforcer(e.target.value);
  };
  const onReceiverChange = e => {
    setReceiver(e.target.value);
  };
  const onSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      await addTask({
        taskName,
        description,
        deadline,
        enforcer,
        receiver,
        file,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 sm:px-6 lg:px-10">
      <div className="container mx-auto">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Create a new task
        </h1>
      </div>
      <div className="container mx-auto">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              className="form-control"
              id="taskName"
              placeholder="Enter task name"
              value={taskName}
              onChange={onTaskNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={onDescriptionChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deadline">Deadline</label>
            <input
              type="date"
              className="form-control"
              id="deadline"
              placeholder="Enter deadline"
              value={deadline}
              onChange={onDeadlineChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="enforcer">Enforcer</label>
            <input
              type="email"
              className="form-control"
              id="enforcer"
              placeholder="Enter enforcer email"
              value={enforcer}
              onChange={onEnforcerChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="receiver">Receiver</label>
            <input
              type="email"
              className="form-control"
              id="receiver"
              placeholder="Enter receiver email"
              value={receiver}
              onChange={onReceiverChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="file">File</label>
            <input
              type="file"
              className="form-control-file"
              id="file"
              ref={filePickerRef}
              onChange={addFile}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

//   return (
//     <div className="min-h-screen bg-gray-50 flex justify-center py-10 sm:px-6 lg:px-10">
//       <form className="w-full max-w-lg">
//         <h1 className="text-center text-3xl font-extrabold text-gray-900">
//           Create a new task
//         </h1>
//         <div className="flex flex-wrap -mx-3 mb-6">
//           <div className="w-full px-3">
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="task-name"
//             >
//               Name
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//               id="task-name"
//               type="text"
//               placeholder="Task name"
//               onChange={e => setTaskName(e.target.value)}
//               value={taskName}
//             />

//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="description"
//             >
//               Description
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//               id="description"
//               type="text"
//               placeholder="description"
//               value={description}
//               onChange={e => setDescription(e.target.value)}
//             />

//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="deadline"
//             >
//               Deadline
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//               id="deadline"
//               type="date"
//               value={deadline}
//               onChange={e => setDeadline(e.target.value)}
//             />
//             {/* upload a photo */}
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="file"
//             >
//               Upload the photo no one should ever see...
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//               id="file"
//               type="file"
//               placeholder="file"
//               ref={filePickerRef}
//               onChange={addImg}
//               value={file}

//             />
//             {isImage ? (
//               <img
//                 src={file}
//                 alt="uploaded"
//                 className="w-full h-64 object-cover object-center"
//               />
//             ) : null}
//             {/* who will recieve this photo if task is unfinished */}
//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="reciever"
//             >
//               Who will receive this photo if deadline is not met?
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//               id="receiver"
//               type="email"
//               placeholder="receiver email"
//               value={receiver}
//               onChange={e => setReceiver(e.target.value)}
//             />

//             <label
//               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
//               htmlFor="enforer"
//             >
//               Who should enforce this task?
//             </label>
//             <input
//               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
//               id="enforer"
//               type="email"
//               placeholder="enforer email"
//               value={enforcer}
//               onChange={e => setEnforcer(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex items-center justify-between">
//           {canSubmitTask ? (
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="button"
//               onClick={handleSubmit}
//               disabled={!canSubmitTask}
//             >
//               {loading ? "Loading..." : "Create"}
//             </button>
//           ) : (
//             <div></div>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

export default NewTask;
