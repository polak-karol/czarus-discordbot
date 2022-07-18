const { MessageEmbed } = require("discord.js");
const {
  getRandomInteger,
  hasArgs,
  isHelpArg,
  removeDiacritics,
} = require("../../utils");
const { whoResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!kto")
    .setDescription("Zapytaj mnie kto...? \n Przykład: `!kto Cię stworzył?`");

const handleAddingToDatabase = (message, args) => {
  switch (args[0]) {
    case "dlaczego":
      break;
    case "czy":
      break;
    case "kiedy":
      break;
    case "myslisz":
      break;
    case "jak":
      break;
    case "kto":
  }
};

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Co do czego?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  message.reply(whoResponses[getRandomInteger(0, whoResponses.length)]);
};

module.exports = {
  name: "dodaj",
  description: "Dodaj odpowiedzi",
  usage: "!dodaj",
  execute: (message, args) => main(message, args),
};
