import React from "react";
import { Link } from "react-router-dom";
import { ArrowNarrowDownIcon } from "@heroicons/react/solid";

export default function Landing() {
  // create a landing page that will show the following:
  // Welcome to Enforco! The best way to ensure you dont procrastinate!
  // Built by procrastinators for procrastinators!

  // How does it work?
  // (what needs to get done) Create a new task
  // (the details) enter the task details and the deadline
  // (the blackmail) upload a deeply embarrasing picture of yourself that no one should ever see, the more embarrasing the better. These photos will never be seen by anyone unless you do not complete the task before the deadline.
  // (the receiver) this is the email address that the photo will be sent to if the task is not completed before the deadline (doomsday!).
  // (the enforcer) enter an email of someone who will enforce that the task is completed before the deadline. Once you complete the task, notify the enforcer that you have completed the task with proof of completion. they can then kill the doomsday device and you can rest assured that you have completed the task and no one will ever see your photos.

  return (
    <main className="bg-[#444B48] flex flex-col justify-center">
      <h1 className="text-center px-10 mt-40 text-3xl text-white font-saira-condensed">
        Welcome to Enforco!
      </h1>
      <div className="flex flex-wrap my-10 justify-center mx-20">
        <p className="text-center text-sm text-white font-saira-condensed px-10">
          <q className="italic">
            {" "}
            The best way to ensure you succeed is through negative reinforcement
            and fear
          </q>{" "}
          - very succesfull person
        </p>
      </div>
      <div className="flex justify-center mt-28">
        <p className="text-center text-2xl text-white font-saira-condensed">
          How it works
        </p>
      </div>
      <div className="flex mt-20 justify-center mx-20">
        <ArrowNarrowDownIcon className="h-7 w-7 text-black animate-pulse" />
      </div>
    </main>
  );
}
