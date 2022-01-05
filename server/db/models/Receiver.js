const Sequelize = require("sequelize");
const db = require("../db");


const Receiver = db.define("receiver", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});


module.exports = Receiver;

