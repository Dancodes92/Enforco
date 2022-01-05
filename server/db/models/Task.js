const Sequelize = require("sequelize");
const db = require("../db");
const Receiver = require("./Receiver");

const Task = db.define("task", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  deadline: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    validation: {
      isUrl: true,
    },
  },
  isFinished: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Task;

Task.prototype.TheReceiver = async function (taskId, receiverId) {
  const task = await Task.findByPk(taskId);
  const receiver = await Receiver.findByPk(receiverId);
  await task.addReceiver(receiver);
};
