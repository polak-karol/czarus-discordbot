const { EmbedBuilder } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { getAnswers } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle("!czym jest")
    .setDescription(
      "Zapytaj mnie czym jest...? \n Przykład: `!czym jest magia słów?`"
    );

const main = async (message, args) => {
  const [firstArg, ...restArgs] = args;
  if (firstArg !== "jest") return message.reply("Czym co?");
  if (!hasArgs(restArgs)) return message.reply("Czym jest co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  const answers = await getAnswers("what_is_answers", message.guildId);

  if (!answers?.length) return message.reply("Nie wiem co odpowiedzieć. :(");

  message.reply(
    answers[0].what_is_answers[
      getRandomInteger(0, answers[0].what_is_answers.length)
    ]
  );
};

module.exports = {
  name: "czym",
  description: "Zapytaj mnie czym...?",
  usage: "!czym",
  execute: (message, args) => main(message, args),
};
