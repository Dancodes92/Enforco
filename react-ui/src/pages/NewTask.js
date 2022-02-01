import React, { useState, useRef } from "react";
import { useAddTaskMutation } from "../store/features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import TaskNameAndDescription from "../components/TaskNameAndDescriptioin";
import DeadlineAndEnforcer from "../components/DeadlineAndEnforcer";
import ReceiverAndFile from "../components/ReceiverAndFile";

function NewTask() {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [enforcer, setEnforcer] = useState("");
  const [receiver, setReceiver] = useState("");
  const [step, setStep] = useState(1);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [addTask, { isLoading: mutationLoading, error: mutationError }] =
    useAddTaskMutation();

  const canAddTask =
    [taskName, description, deadline, enforcer, receiver, file].every(
      Boolean
    ) && !loading;

  const addFile = e => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = readerEvent => {
      setFile(readerEvent.target.result);
    };
  };

  const onAddFileChange = input => {
    setFile(input);
  };
  console.log("all", taskName, description, deadline, enforcer, receiver, file);

  // const onSubmit = async () => {
  //   setLoading(true);
  //   const { data } = await addTask({
  //     variables: {
  //       taskName,
  //       description,
  //       deadline,
  //       enforcer,
  //       receiver,
  //       file,
  //     },
  //   });
  //   setLoading(false);
  //   if (data) {
  //     toast.success("Task added successfully");
  //     navigate("/home");
  //   } else {
  //     toast.error("Error adding task");
  //   }
  // };

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
      toast.success(`Task added successfully and sent to ${enforcer}`);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const onTaskNameChange = input => {
    setTaskName(input);
  };

  const onDescriptionChange = input => {
    setDescription(input);
  };

  const onDeadlineChange = input => {
    // do not allow to set deadline in the past
    if (new Date(input) <= new Date()) {
      toast.error("Deadline must be at least 24 hours from now");
      return;
    } else {
      setDeadline(input);
    }
  };
  const onEnforcerChange = input => {
    setEnforcer(input);
  };
  const onReceiverChange = input => {
    setReceiver(input);
  };

  //can i get rid of id on the input?
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex justify-center py-10 sm:px-6 lg:px-10">
  //       <form onSubmit={onSubmit} className="w-full max-w-lg">
  //         <h1 className="text-center text-3xl font-extrabold text-gray-900">
  //           Create A New Task
  //         </h1>
  //         <div className="flex flex-wrap -mx-3 mb-6">
  //           <div className="w-full px-3">
  //             <label
  //               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               htmlFor="taskName"
  //             >
  //               Task Name
  //             </label>
  //             <input
  //               type="text"
  //               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //               id="taskName"
  //               placeholder="Enter task name"
  //               value={taskName}
  //               onChange={onTaskNameChange}
  //             />

  //             <label
  //               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               htmlFor="description"
  //             >
  //               Description
  //             </label>
  //             <input
  //               type="text"
  //               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //               id="description"
  //               placeholder="Enter description"
  //               value={description}
  //               onChange={onDescriptionChange}
  //             />

  //             <label
  //               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               htmlFor="deadline"
  //             >
  //               Deadline
  //             </label>
  //             <input
  //               // do not allow user to enter date in the pasts

  //               type="date"
  //               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
  //               id="deadline"
  //               placeholder="Enter deadline"
  //               value={deadline}
  //               onChange={onDeadlineChange}
  //             />
  //             <label
  //               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               htmlFor="enforcer"
  //             >
  //               Enforcer
  //             </label>
  //             <input
  //               type="email"
  //               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //               id="enforcer"
  //               placeholder="Enter enforcer email"
  //               value={enforcer}
  //               onChange={onEnforcerChange}
  //             />

  //             <label
  //               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               htmlFor="receiver"
  //             >
  //               Receiver
  //             </label>
  //             <input
  //               type="email"
  //               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //               id="receiver"
  //               placeholder="Enter receiver email"
  //               value={receiver}
  //               onChange={onReceiverChange}
  //             />

  //             <label
  //               className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
  //               htmlFor="file"
  //             >
  //               File
  //             </label>
  //             <input
  //               type="file"
  //               className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
  //               id="file"
  //               ref={filePickerRef}
  //               onChange={addFile}
  //             />

  //             <div className="flex items-center justify-between">
  //               {canAddTask ? (
  //                 <button
  //                   className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
  //                   type="button"
  //                   onClick={onSubmit}
  //                   disabled={!canAddTask}
  //                 >
  //                   {loading ? "Loading..." : "Create"}
  //                 </button>
  //               ) : (
  //                 <div></div>
  //               )}
  //             </div>
  //           </div>
  //         </div>
  //       </form>
  //     </div>
  //   );
  // }

  const onNextStep = () => {
    setStep(step + 1);
  };

  const onPrevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return (
        <TaskNameAndDescription
          onNextStep={onNextStep}
          onTaskNameChange={onTaskNameChange}
          onDescriptionChange={onDescriptionChange}
          taskName={taskName}
          description={description}
        />
      );
    case 2:
      return (
        <DeadlineAndEnforcer
          deadline={deadline}
          enforcer={enforcer}
          onDeadlineChange={onDeadlineChange}
          onEnforcerChange={onEnforcerChange}
          onNextStep={onNextStep}
          onPrevStep={onPrevStep}
        />
      );
    case 3:
      return (
        <ReceiverAndFile
          receiver={receiver}
          file={file}
          onAddFileChange={onAddFileChange}
          onReceiverChange={onReceiverChange}
          onSubmit={onSubmit}
          onPrevStep={onPrevStep}
        />
      );
    default:
      return null;
  }
}

export default NewTask;
