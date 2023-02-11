const { EmbedBuilder } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { getAnswers } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle("!czy")
    .setDescription(
      "Zapytaj mnie czy...? \n Przykład: `!czy umiesz robić coś innego?`"
    );

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Czy co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  const answers = await getAnswers("does_answers", message.guildId);

  if (!answers?.length) return message.reply("Nie wiem co odpowiedzieć. :(");

  message.reply(
    answers[0].does_answers[getRandomInteger(0, answers[0].does_answers.length)]
  );
};

module.exports = {
  name: "czy",
  description: "Zapytaj mnie czy...?",
  usage: "!czy",
  execute: (message, args) => main(message, args),
};
