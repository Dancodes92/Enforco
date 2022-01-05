const router = require("express").Router();
const {
  models: { User, Task, Enforcer, Receiver },
} = require("../db");
module.exports = router;

// route to create a new task for a user and add a receiver and enforcer to the task
router.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const { id } = user;
    const { taskName, description, deadline, image, receiver, enforcer } =
      req.body;
    const theEnforcer = await Enforcer.findOrCreate({
      where: {
        email: enforcer,
        userId: id,
      },
    });
    const theReceiver = await Receiver.findOrCreate({
      where: {
        email: receiver,
      },
    });
    const task = await Task.create({
      name: taskName,
      description,
      deadline,
      image,
      isFinished: false,
      UserId: id,
      EnforcerId: theEnforcer[0].id, //theEnforcer[0] is the array of the enforcer
      ReceiverId: theReceiver[0].id,
    });
    await task.TheReceiver(task.id, theReceiver[0].id);

    res.json(task);
  } catch (err) {
    next(err);
  }
});
