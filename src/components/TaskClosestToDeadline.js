import React, { useEffect, useState, useMemo } from "react";

function TaskClosestToDeadline(props) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [minutesLeft, setMinutesLeft] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if(props.tasks) {
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


  // // get the deadline from props.tasks.deadline
  // const Thedeadline = props.tasks.deadline;
  // // convert the deadline to a date object
  // // wrap deadlineDate in useMemo to avoid re-rendering
  // const deadlineDate = useMemo(() => new Date(Thedeadline), [Thedeadline]);
  // // find the local timezone offset
  // const timezoneOffset = deadlineDate.getTimezoneOffset() * 60000;
  // // add the timezone offset to the deadline date

  // const deadlineDateWithOffset = useMemo(() => new Date(deadlineDate.getTime() + timezoneOffset), [
  //   deadlineDate,
  //   timezoneOffset,
  // ]);







  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const currentDate = new Date();
  //     const deadline = deadlineDateWithOffset
  //     const timeDiff = deadline.getTime() - currentDate.getTime();
  //     const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  //     const hoursLeft = Math.floor(timeDiff / (1000 * 60 * 60)) % 24;
  //     const minutesLeft = Math.floor(timeDiff / 1000 / 60) % 60;
  //     const secondsLeft = Math.floor(timeDiff / 1000) % 60;
  //     setDaysLeft(daysLeft);
  //     setHoursLeft(hoursLeft);
  //     setMinutesLeft(minutesLeft);
  //     setSecondsLeft(secondsLeft);
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [deadlineDateWithOffset]);

 if(!props.tasks) {
    return null
  }

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
