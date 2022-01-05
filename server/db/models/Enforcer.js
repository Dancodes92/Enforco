const Sequelize = require("sequelize");
const db = require("../db");

const Enforcer = db.define("enforcer", {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
});

module.exports = Enforcer;
