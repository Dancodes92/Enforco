import React, { useEffect, useState } from "react";

function TaskClosestToDeadline(props) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  // get the deadline from props.tasks.deadline
  const Thedeadline = props.tasks.deadline;
  // convert the deadline to a date object
  const deadlineDate = new Date(Thedeadline);
  // find the local timezone offset
  const timezoneOffset = deadlineDate.getTimezoneOffset() * 60000;
  // add the timezone offset to the deadline date
  const deadlineDateWithOffset = new Date(deadlineDate.getTime() + timezoneOffset);






  useEffect(() => {
    const interval = setInterval(() => {
      const currentDate = new Date();
      const deadline = deadlineDateWithOffset
      const timeDiff = deadline.getTime() - currentDate.getTime();
      const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
      const minutesLeft = Math.floor(timeDiff / 1000 / 60) % 60;
      const secondsLeft = Math.floor(timeDiff / 1000) % 60;
      setDaysLeft(daysLeft);
      setHoursLeft(hoursLeft);
      setMinutesLeft(minutesLeft);
      setSecondsLeft(secondsLeft);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.tasks]);



  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">
        {props.tasks.name}
      </h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">
          {daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes, {secondsLeft} seconds
        </h2>
      </div>
    </div>
  );
}

export default TaskClosestToDeadline;
