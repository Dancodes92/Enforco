const router = require("express").Router();
const {
  models: { User, Task, Enforcer, Receiver },
} = require("../db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
module.exports = router;

// route to create a new task for a user and add a receiver and enforcer to the task
router.post("/", async (req, res, next) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDNAME,
      api_key: process.env.CLOUDKEY,
      api_secret: process.env.CLOUDSECRET,
      secure: true,
    });

    const imageUrl = await cloudinary.uploader.upload(
      req.body.file,
      function (error, result) {
        console.log(result, error);
      }
    );

    const user = await User.findByToken(req.headers.authorization);
    const { id } = user;
    const { taskName, description, deadline, receiver, enforcer } =
      req.body;
    const theEnforcer = await Enforcer.findOrCreate({
      where: {
        email: enforcer,
      },
    });
    const theReceiver = await Receiver.create({
      email: receiver,
    });
    const task = await Task.create({
      name: taskName,
      description,
      deadline,
      image: imageUrl.url,
      isFinished: false,
      userId: id,
      enforcerId: theEnforcer[0].id, //theEnforcer[0] is the array of the enforcer
    });
    await task.TheReceiver(task.id, theReceiver.id);

    res.json(task);
  } catch (err) {
    next(err);
  }
});
