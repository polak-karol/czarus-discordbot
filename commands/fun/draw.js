const { MessageEmbed } = require("discord.js");
const {
  isHelpArg,
  hasArgs,
  noArgsMessage,
  getRandomInteger,
  convertArgName,
  removeDiacritics,
  capitalizeFirstLetter,
} = require("../../utils");
const {
  character,
  drawHelpMessage,
  genre,
  narration,
  required_word,
  forbidden_word,
  theme,
  place,
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
    switch (removeDiacritics(arg.toLowerCase())) {
      case "temat":
        setResult(
          arg,
          capitalizeFirstLetter(theme[getRandomInteger(0, theme.length)])
        );
        break;
      case "narracje":
        setResult(
          arg,
          capitalizeFirstLetter(
            narration[getRandomInteger(0, narration.length)]
          )
        );
        break;
      case "wymagane_slowo":
        setResult(
          arg,
          capitalizeFirstLetter(
            required_word[getRandomInteger(0, required_word.length)]
          )
        );
        break;
      case "zabronione_slowo":
        setResult(
          arg,
          capitalizeFirstLetter(
            forbidden_word[getRandomInteger(0, forbidden_word.length)]
          )
        );
        break;
      case "gatunek":
        setResult(
          arg,
          capitalizeFirstLetter(genre[getRandomInteger(0, genre.length)])
        );
        break;
      case "zakres_slow":
        setResult(
          arg,
          capitalizeFirstLetter(
            wordsRange[getRandomInteger(0, wordsRange.length)]
          )
        );
        break;
      case "postac":
        setResult(
          arg,
          capitalizeFirstLetter(
            character[getRandomInteger(0, character.length)]
          )
        );
        break;
      case "miejsce":
        setResult(
          arg,
          capitalizeFirstLetter(place[getRandomInteger(0, place.length)])
        );
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
        name: "Zakres słów",
        value: "Wymagany zakres słów w utworze. \n `!losuj zakres_słów`",
        inline: true,
      },
      {
        name: "Postać",
        value: "Główna postać utworu. \n `!losuj postać`",
        inline: true,
      },
      {
        name: "Miejsce",
        value: "Miejsce rozgrywania się akcji. \n `!losuj miejsce`",
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
