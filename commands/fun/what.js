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
      "Zapytaj mnie co myślę o...? \n Przykład: `!co myślisz o?`"
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

const main = async (message, args) => {
  if (isThinkQuestion(args)) handleThinkQuestion(message, args);
  if (!hasArgs(args)) return message.reply("Co co?");

  message.reply("Nie ogarniam, zostaw mnie.");
};

module.exports = {
  name: "co",
  description: "Zapytaj mnie co...?",
  usage: "!co",
  execute: (message, args) => main(message, args),
};
