const { MessageEmbed } = require("discord.js");
const {
  isHelpArg,
  hasArgs,
  noArgsMessage,
  getRandomInteger,
  convertArgName,
} = require("../../utils");
const {
  drawHelpMessage,
  genre,
  narration,
} = require("../../utils/commands/funUtils");

const result = [];

const setResult = (name, value, inline = true) => {
  result.push({ name: convertArgName(name), value, inline });
};

const setFieldSpacing = (direction) => {
  if (direction === "bottom")
    return result.push({ name: "\u200B", value: "\u200B" });

  return result.unshift({ name: "\u200B", value: "\u200B" });
};

const draw = (args) => {
  result.length = 0;
  args.forEach((arg) => {
    switch (arg.toLowerCase()) {
      case "temat":
        setResult(arg, "Ninja");
        break;
      case "narrację":
        setResult(arg, narration[getRandomInteger(0, narration.length)]);
        break;
      case "wymagane_słowo":
        setResult(arg, "Woźny");
        break;
      case "zabronione_słowo":
        setResult(arg, "Jeśli");
        break;
      case "gatunek":
        setResult(arg, genre[getRandomInteger(0, genre.length)]);
        break;
      case "liczbę_słów":
        setResult(arg, String(getRandomInteger(100, 2000)));
        break;
      case "postać":
        setResult(arg, "Walory");
        break;
      default:
        break;
    }
  });
};

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!losuj")
    .setDescription(
      "Losuje wybrane kategorie do wyzwania pisarskiego. Możliwe jest losowanie kilku kategorii jednocześnie. \n Przykład: `!losuj gatunek temat` \n \n Poniżej znajduje się spis wszystkich kategorii:"
    )
    .setFields(
      {
        name: "Temat",
        value: "Temat przewodni. \n `!losuj temat`",
        inline: true,
      },
      {
        name: "Narracja",
        value: "Narracje utworu. \n `!losuj narrację`",
        inline: true,
      },
      {
        name: "Wymagane słowo",
        value:
          "Słowo, które musi znaleźć się w utworze. \n `!losuj wymagane_słowo`",
        inline: true,
      },
      {
        name: "Zabronione słowo",
        value:
          "Słowo, które nie może zostać użyte w pracy. \n `!losuj zabronione_słowo`",
        inline: true,
      },
      {
        name: "Gatunek",
        value: "Gatunek pracy. \n `!losuj gatunek`",
        inline: true,
      },
      {
        name: "Liczba słów",
        value: "Maksymalna liczba słów. \n `!losuj liczbę_słów`",
        inline: true,
      },
      {
        name: "Postać",
        value: "Główna postać utworu. \n `!losuj postać`",
        inline: true,
      }
    );

const getResultEmbed = (message) =>
  new MessageEmbed()
    .setTitle("Wylosowano dla Ciebie:")
    .addFields(result)
    .setAuthor({
      name: message.author.username,
      iconURL: message.author.avatarURL({ dynamic: true }),
    })
    .setFooter({ text: "Połamania pióra!" });

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply(noArgsMessage);
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  draw(args);

  if (!result.length) return message.reply("Podano błędne argumenty.");
  setFieldSpacing("bottom");

  message.reply({ embeds: [getResultEmbed(message)] });
};

module.exports = {
  name: "losuj",
  description: drawHelpMessage,
  usage: "!losuj",
  execute: (message, args) => main(message, args),
};
