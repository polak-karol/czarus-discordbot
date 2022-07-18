const { MessageEmbed } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { whyResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!dlaczego")
    .setDescription(
      "Zapytaj mnie dlaczego... ? \n Przykład: `!dlaczego ciągle czytasz ?`"
    );

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Dlaczego co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(whyResponses[getRandomInteger(0, whyResponses.length)]);
};

module.exports = {
  name: "dlaczego",
  description: "Zapytaj mnie dlaczego... ?",
  usage: "!dlaczego",
  execute: (message, args) => main(message, args),
};
