const { EmbedBuilder } = require("discord.js");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { getAnswers } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle("!dlaczego")
    .setDescription(
      "Zapytaj mnie dlaczego...? \n Przykład: `!dlaczego ciągle czytasz?`"
    );

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Dlaczego co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  const answers = await getAnswers("why_answers", message.guildId);

  if (!answers?.length) return message.reply("Nie wiem co odpowiedzieć. :(");

  message.reply(
    answers[0].why_answers[getRandomInteger(0, answers[0].why_answers.length)]
  );
};

module.exports = {
  name: "dlaczego",
  description: "Zapytaj mnie dlaczego...?",
  usage: "!dlaczego",
  execute: (message, args) => main(message, args),
};
