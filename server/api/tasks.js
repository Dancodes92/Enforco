const router = require("express").Router();
const {
  models: { User, Task, Enforcer, Receiver },
} = require("../db");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const nodeMailer = require("nodemailer");
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
    const { taskName, description, deadline, receiver, enforcer } = req.body;
    const theEnforcer = await Enforcer.findOrCreate({
      where: {
        email: enforcer.toLowerCase(),
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
      image: imageUrl.url,
      isFinished: false,
      userId: id,
      enforcerId: theEnforcer[0].id, //theEnforcer[0] is the array of the enforcer
    });
    await task.addReceiver(theReceiver[0]);
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: enforcer,
      subject: `${user.name} is asking you to make sure they finish ${task.name}`,
      text: `You have a been asked to enforce a task for ${user.name}. Please log in to your account to accept or reject the task. click here to login https://task-manager-app.herokuapp.com/login`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.json(task);
  } catch (err) {
    next(err);
  }
});

// route to get all tasks for a user and all the enforcers for each task
router.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const tasks = await Task.findAll({
      where: {
        userId: user.id,
      },
      include: [
        {
          model: Enforcer,
          as: "enforcer",
        },
        {
          model: Receiver,
          as: "receivers",
        },
      ],
      attributes: {
        exclude: ["userId", "enforcerId", "receiverId", "image"],
      },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

//route to get all tasks that a user is enforcer for
router.get("/enforcer", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    const iAmEnforcer = await Enforcer.findAll({
      where: {
        email: user.email.toLowerCase(),
      },
    });
    const tasks = await Task.findAll({
      where: {
        enforcerId: iAmEnforcer[0].id,
      },
      include: [
        {
          model: Enforcer,
          as: "enforcer",
        },
        {
          model: Receiver,
          as: "receivers",
        },
        {
          model: User,
          as: "user",
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      attributes: {
        exclude: ["userId", "enforcerId", "receiverId", "image"],
      },
    });
    res.json(tasks);
  } catch (err) {
    next(err);
  }
});

// route to edit a task and update isAccepted to true
router.put("/acceptorcomplete", async (req, res, next) => {
  try {
    console.log("req.body", req.body);
    const user = await User.findByToken(req.headers.authorization);
    const task = await Task.findByPk(req.body.id);
    const taskUser = await User.findByPk(task.userId);
    const enforcer = await Enforcer.findByPk(task.enforcerId);
    if (enforcer.email.toLowerCase() !== user.email.toLowerCase()) {
      // check if the user is the enforcer of the task
      res
        .status(401)
        .json({ message: "You are not authorized to edit this task" });
    } else {
      const transporter = nodeMailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      });
      const mailOptions = {
        from: process.env.EMAIL,
        to: taskUser.email,
        subject: `${enforcer.name} has accepted your task`,
        text: `Your task has been accepted by ${enforcer.email}. The countdown has begun... Godspeed. click here to login https://task-manager-app.herokuapp.com/login`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      const updatedTask = await task.update(req.body);
      res.json(updatedTask);
    }
  } catch (err) {
    next(err);
  }
});
