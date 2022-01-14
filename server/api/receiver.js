const router = require("express").Router();
const {
  models: { User, Task, Enforcer, Receiver },
} = require("../db");
require("dotenv").config();
const nodeMailer = require("nodemailer");
module.exports = router;

// get receiver for the task and send email with the task image
router.post("/receiver/:id", async (req, res, next) => {
  try {
    const task = await Task.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Receiver,
          attributes: ["email"],
        },
      ],
    });
    const transporter = nodeMailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: task.receiver.email,
      subject: `${task.name}`,
      text: `${task.description}`,
      html: `<img src="${task.image}">`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.send("image sent");
  } catch (err) {
    next(err);
  }
});
