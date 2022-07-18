const { MessageEmbed } = require("discord.js");
const { getClient } = require("../../database/getClient");
const { getRandomInteger, hasArgs, isHelpArg } = require("../../utils");
const { whyResponses } = require("../../utils/commands/funUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!dlaczego")
    .setDescription(
      "Zapytaj mnie dlaczego...? \n Przykład: `!dlaczego ciągle czytasz?`"
    );

const getWhyAnswers = async (guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT answer FROM why_answers WHERE guild_id = '${guildId}';`
  );

  await client.end();

  return entries.rows;
};

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply("Dlaczego co?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });

  const answers = await getWhyAnswers(message.guildId);

  message.reply(answers[getRandomInteger(0, answers.length)].answer);
};

module.exports = {
  name: "dlaczego",
  description: "Zapytaj mnie dlaczego...?",
  usage: "!dlaczego",
  execute: (message, args) => main(message, args),
};
