//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Task = require("./models/Task");
const Enforcer = require("./models/Enforcer");
const Receiver = require("./models/Receiver");

//associations could go here!
User.hasMany(Task);
Task.belongsTo(User);

Enforcer.hasMany(Task);
Task.belongsTo(Enforcer);

Task.hasMany(Receiver);
Receiver.belongsTo(Task);

User.hasMany(Enforcer);
Enforcer.belongsTo(User);

module.exports = {
  db,
  models: {
    User,
    Task,
    Enforcer,
    Receiver,
  },
};
