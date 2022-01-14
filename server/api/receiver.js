const router = require("express").Router();
const {
  models: { User, Task, Enforcer, Receiver, TaskReceiver },
} = require("../db");
require("dotenv").config();
const nodeMailer = require("nodemailer");
const nodeCron = require("node-cron");
const { Op } = require("sequelize");
module.exports = router;

    nodeCron.schedule("0 0 * * * ", async () => {
      //every day at midnight
      const tasks = await Task.findAll({
        where: {
          deadline: {
            [Op.gt]: new Date(), //current date is greater than deadline
          },
          isFinished: false,
          status: "active",
        },
        include: [
          {
            model: Receiver,
            as: "receivers",
          },
          {
            model: User,
            as: "user",
          },
        ],
      });
      tasks.forEach(async (task) => {
        const { user } = task;
        const { receivers } = task;
        task.update({
          status: "failed",
        });
        receivers.forEach(async (receiver) => {
          const { email } = receiver;
          const transporter = nodeMailer.createTransport({
            service: "gmail",
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });
          const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: `${user.name} has not finished ${task.name}... this is the punishment they deserve`,
            html: `<img src="${task.image}" alt="task image" />`,
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              console.log(err);
            } else {
              console.log(info);
            }
          });
        });
      });
    });


