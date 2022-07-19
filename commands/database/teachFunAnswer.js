const { MessageEmbed } = require("discord.js");
const { getClient } = require("../../database/getClient");
const {
  hasArgs,
  isHelpArg,
  removeDiacritics,
  isAdmin,
  getRandomInteger,
} = require("../../utils");
const { teachAnswers } = require("../../utils/commands/databaseUtils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!naucz")
    .setDescription(
      "Naucz mnie nowych zdań! \n Przykład: `!naucz dlaczego Nie mam zielonego pojęcia.`"
    );

const addAnswerToDatabase = async (answerName, answer, guildId) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM answers WHERE guild_id = '${guildId}'`
  );

  if (parseInt(countResult.rows[0].count, 10) === 0) {
    await client.query(
      `INSERT INTO answers(${answerName}, guild_id) VALUES (ARRAY['${answer}'], '${guildId}');`
    );
  } else {
    await client.query(
      `UPDATE answers SET ${answerName} = ARRAY_APPEND(${answerName}, '${answer}') WHERE guild_id = '${guildId}';`
    );
  }

  await client.end();
};

const handleAddingAnswerToDatabase = (message, args) => {
  const [questionType, ...restArgs] = args;

  switch (removeDiacritics(questionType.toLowerCase())) {
    case "dlaczego":
      addAnswerToDatabase("why_answers", restArgs.join(" "), message.guildId);
      break;
    case "czy":
      addAnswerToDatabase("does_answers", restArgs.join(" "), message.guildId);
      break;
    case "kiedy":
      addAnswerToDatabase("when_answers", restArgs.join(" "), message.guildId);
      break;
    case "mysli":
      addAnswerToDatabase(
        "what_do_you_think_answers",
        restArgs.join(" "),
        message.guildId
      );
      break;
    case "jak":
      addAnswerToDatabase("how_answers", restArgs.join(" "), message.guildId);
      break;
    case "kto":
      addAnswerToDatabase("who_answers", restArgs.join(" "), message.guildId);
      break;
    case "co":
      addAnswerToDatabase("what_answers", restArgs.join(" "), message.guildId);
      break;
    default:
      break;
  }
};

const main = async (message, args) => {
  if (!isAdmin(message))
    return message.channel.send("Nie wyglądasz mi na admina...");
  if (!hasArgs(args)) return message.reply("Co do czego?");
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] });
  handleAddingAnswerToDatabase(message, args);

  message.reply(teachAnswers[getRandomInteger(0, teachAnswers.length)]);
};

module.exports = {
  name: "naucz",
  description: "Naucz Czarusia odpowiedzi",
  usage: "!naucz",
  execute: (message, args) => main(message, args),
};