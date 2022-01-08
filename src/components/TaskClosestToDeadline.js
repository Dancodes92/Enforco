import React, { useEffect, useState } from "react";

function TaskClosestToDeadline(props) {
  const [closestTask, setClosestTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [timeLeft, setTimeLeft] = useState(null);



  useEffect(() => {
    if (props.tasks) {
      const closestTask = props.tasks.find(
        task =>
          task.deadline ===
          props.tasks.reduce((min, p) => (p.deadline < min.deadline ? p : min))
            .deadline
      );
      // create a live countdown timer with days hours minutes and seconds
      const timer = setInterval(() => {
        const now = new Date();
        const deadline = new Date(closestTask.deadline);
        const timeLeft = deadline - now;
        const object = {
          days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
          hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((timeLeft % (1000 * 60)) / 1000),
        };

        setTimeLeft(
          `${object.days}D ${object.hours}H ${object.minutes}M ${object.seconds}S until Doomsday`
        );
      }, 1000);
      setClosestTask(closestTask);
      setTasks(props.tasks);
    }
  }, [props.tasks]);




  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Closest Deadline</h1>
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold">{closestTask?.name}</h2>
        <h3 className="text-xl font-bold">{timeLeft}</h3>
      </div>
    </div>
  );
}

export default TaskClosestToDeadline;
