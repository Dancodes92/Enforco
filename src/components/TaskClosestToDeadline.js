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


 if(!props.tasks) {
    return null
  }



  // return the task name with a tailwind animation for the countdown
//   return (
//     <div className="flex flex-col justify-center items-center">
//       <h1 className="text-4xl font-bold text-center">
//         {props.tasks.name}
//         <span className="text-blue-500">
//           <span className="text-6xl font-bold">
//             {daysLeft} D   {hoursLeft} H   {minutesLeft} M   {secondsLeft} S
//           </span>
//           <span className="text-6xl font-bold">
//             {hoursLeft} H
//           </span>
//           <span className="text-6xl font-bold">
//             {minutesLeft} M
//           </span>
//           <span className="text-6xl font-bold">
//             {secondsLeft} S
//           </span>
//         </span>
//       </h1>
//     </div>
//   );
// }

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
