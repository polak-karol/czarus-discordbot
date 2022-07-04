const { Permissions } = require("discord.js");

const noArgsMessage = "Musisz podać argumenty.";

const isAdmin = (message) =>
  message.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);

const isHelpArg = (args) => args.at(0) === "pomoc";

const hasArgs = (args) => !!args.length;

const getRandomInteger = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const convertArgName = (arg) => arg.split("_").join(" ");

module.exports = {
  noArgsMessage,
  isAdmin,
  isHelpArg,
  hasArgs,
  getRandomInteger,
  convertArgName,
};
