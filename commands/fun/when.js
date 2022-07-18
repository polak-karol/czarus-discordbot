const { MessageEmbed } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { whenResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!kiedy")
    .setDescription(
      "Zapytaj mnie kiedy...? \n Przykład: `!kiedy skończysz czytać?`"
    );

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Kiedy co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(whenResponses[getRandomInteger(0, whenResponses.length)]);
};

module.exports = {
  name: "kiedy",
  description: "Zapytaj mnie kiedy...?",
  usage: "!kiedy",
  execute: (message, args) => main(message, args),
};
