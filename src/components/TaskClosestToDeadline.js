import React, { useEffect, useState, useMemo } from "react";

function TaskClosestToDeadline(props) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (props.tasks) {
      const interval = setInterval(() => {
        const deadline = new Date(props.tasks.deadline);
        const now = new Date();
        const timeZoneOffset = now.getTimezoneOffset() * 60000;
        const deadlineDate = new Date(deadline.getTime() + timeZoneOffset);
        const timeLeft = deadlineDate - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        setDaysLeft(days);
        setHoursLeft(hours);
        setMinutesLeft(minutes);
        setSecondsLeft(seconds);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [props.tasks]);

  //if the deadline is in the past, return "deadline passed"
  if (daysLeft < 0) {
    // return "deadline passed"; and center the text in the div blinking red
    

    return (
      <div className="text-center text-red-500 text-xl font-bold animate-pulse">
        Deadline Passed
      </div>
    );
  }

  if (!props.tasks) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">{props.tasks.name}</h1>
      <div className="flex flex-col items-center justify-center">
        {daysLeft === 0 ? (
          <span className="text-6xl font-bold text-red-700">
            {hoursLeft} H {minutesLeft} M {secondsLeft} S
          </span>
        ) : (
          <span className="text-6xl font-bold text-blue-500">
            {daysLeft} D {hoursLeft} H {minutesLeft} M
          </span>
        )}
      </div>
    </div>
  );
}

export default TaskClosestToDeadline;
