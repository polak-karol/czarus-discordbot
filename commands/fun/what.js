const { MessageEmbed } = require("discord.js");
const {
  getRandomInteger,
  hasArgs,
  isHelpArg,
  removeDiacritics,
} = require("../../utils");
const { doYouThinkResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!co myślisz o")
    .setDescription(
      "Zapytaj mnie co myślę o...? \n Przykład: `!co myślisz o mnie?`"
    );

const isThinkQuestion = (args) =>
  removeDiacritics(args[0]) === "myslisz" && removeDiacritics(args[1]) === "o";

const handleThinkQuestion = (message, args) => {
  const [, , ...restArgs] = args;
  if (!hasArgs(restArgs)) return message.reply("Co myślę o?");
  if (isHelpArg(restArgs)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(
    doYouThinkResponses[getRandomInteger(0, doYouThinkResponses.length)]
  );
};

const isJudgeQuestion = (args) =>
  removeDiacritics(args[0]) === "sadzisz" && removeDiacritics(args[1]) === "o";

const main = async (message, args) => {
  if (isThinkQuestion(args)) return handleThinkQuestion(message, args);
  if (isJudgeQuestion(args)) return message.reply("Od sądzenia jest sąd!");

  if (!hasArgs(args)) return message.reply("Co co?");

  message.reply("Nie ogarniam, zostaw mnie.");
};

module.exports = {
  name: "co",
  description: "Zapytaj mnie co...?",
  usage: "!co",
  execute: (message, args) => main(message, args),
};
