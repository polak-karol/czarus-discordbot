const { MessageEmbed } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { getAnswers } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!kto")
    .setDescription("Zapytaj mnie kto...? \n Przykład: `!kto Cię stworzył?`");

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("kto co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  const answers = await getAnswers("who_answers", message.guildId);

  if (answers.length === 0)
    return message.reply("Nie wiem co odpowiedzieć. :(");

  message.reply(
    answers[0].who_answers[getRandomInteger(0, answers[0].who_answers.length)]
  );
};

module.exports = {
  name: "kto",
  description: "Zapytaj mnie kto...?",
  usage: "!kto",
  execute: (message, args) => main(message, args),
};
