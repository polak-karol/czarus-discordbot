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
  theme,
  wordsRange,
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
        setResult(arg, theme[getRandomInteger(0, theme.length)]);
        break;
      case "narrację":
        setResult(arg, narration[getRandomInteger(0, narration.length)]);
        break;
      case "wymagane_słowo":
        // setResult(arg, "");
        break;
      case "zabronione_słowo":
        // setResult(arg, "");
        break;
      case "gatunek":
        setResult(arg, genre[getRandomInteger(0, genre.length)]);
        break;
      case "zakres_słów":
        setResult(arg, wordsRange[getRandomInteger(0, wordsRange.length)]);
        break;
      case "postać":
        // setResult(arg, "");
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
        name: "Wymagane słowo (tymczasowo nieaktywne)",
        value:
          "Słowo, które musi znaleźć się w utworze. \n `!losuj wymagane_słowo`",
        inline: true,
      },
      {
        name: "Zabronione słowo (tymczasowo nieaktywne)",
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
        name: "Zakres słów",
        value: "Wymagany zakres słów w utworze. \n `!losuj zakres_słów`",
        inline: true,
      },
      {
        name: "Postać (tymczasowo nieaktywne)",
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
