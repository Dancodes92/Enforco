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
    <main className="snap-y snap-mandatory h-screen overscroll-contain">
      <div className="bg-[#444B48] flex flex-col justify-center snap-start h-screen w-screen">
        <h1 className="text-center px-10 text-3xl text-white font-saira-condensed">
          Welcome to Enforco!
        </h1>
        <div className="flex flex-wrap my-10 justify-center mx-20">
          <p className="text-center text-sm text-white font-saira-condensed px-10">
            <q className="italic">
              {" "}
              The best way to ensure you succeed is through negative
              reinforcement and fear
            </q>{" "}
            - Elon Muskrat
          </p>
        </div>
        <div className="flex justify-center mt-28">
          <p className="text-center text-2xl text-white font-saira-condensed">
            How it works
          </p>
        </div>
        <div className="flex mt-20 justify-center mx-20">
          <ArrowNarrowDownIcon
            className="pt-2 h-7 w-7 text-black animate-bounce cursor-pointer"
            onClick={className => {
              //scroll to the next div on click
              document.getElementById("second").scrollIntoView({
                behavior: "smooth",
              });
            }}
          />
        </div>
      </div>

      <div
        className="flex flex-col items-center justify-center snap-start w-screen h-screen"
        id="second"
      >
        {/* a box with text inside it */}
        <div className="bg-[#444B48] rounded-lg p-10 w-full h-full">
          <h1 className="text-center text-2xl text-white font-saira-condensed pt-5">
            Goal Accountability
          </h1>
          <div className="flex justify-center mt-5 mx-20">
            <p className="text-center text-l text-white font-saira-condensed">
              It works by allowing you to upload a photo of yourself that no one
              should see...EVER... something so embarrassing that if it ever got
              out would be mortifying.
            </p>
          </div>
          <div className="flex justify-center mt-3 mx-20">
            <p className="text-center text-l text-white font-saira-condensed">
              You must complete the task (goal) you created before the deadline,
              If you do not complete the task before the deadline, the photo is
              automatically emailed to a “receiver” that you specify (family
              friend boss etc...), ultimately humiliating you forever.
            </p>
          </div>
          <div className="flex justify-center mt-3 mx-20">
            <p className="text-center text-l text-white font-saira-condensed">
              The enforcer is someone that you choose to approve your proof of
              work. Submit your work when finished to them and they will hold
              the power to set the task to complete (ending the doomsday
              device). This will stop the countdown and your photo will be
              destroyed, never to be seen by anyone.
            </p>
          </div>
          {/* Sign up button */}
          <div className="flex justify-center mt-5 mx-20">
            <Link
              to="/signup"
              className="bg-transparent font-saira-condensed hover:bg-white text-black font-semibold hover:text-black py-2 px-4 border border-black hover:border-transparent rounded"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
