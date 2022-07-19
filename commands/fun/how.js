const { MessageEmbed } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { getAnswers } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!jak")
    .setDescription("Zapytaj mnie jak...? \n Przykład: `!jak to robisz?`");

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Jak co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  const answers = await getAnswers("how_answers", message.guildId);

  if (answers.length === 0) return message.reply("Nie wiem co odpowiedzieć. :(");

  message.reply(answers[getRandomInteger(0, answers.length)].answer);
};

module.exports = {
  name: "jak",
  description: "Zapytaj mnie jak...?",
  usage: "!jak",
  execute: (message, args) => main(message, args),
};
