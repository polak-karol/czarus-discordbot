const { MessageEmbed } = require("discord.js");
const { getClient } = require("../../database/getClient");
const {
  hasArgs,
  isHelpArg,
  removeDiacritics,
  isAdmin,
} = require("../../utils");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!kto")
    .setDescription("Zapytaj mnie kto...? \n Przykład: `!kto Cię stworzył?`");

const addAnswerToDatabase = async (tableName, answer, guildId) => {
  const client = await getClient();
  let insertRow = await client.query(
    `INSERT INTO ${tableName}(answer, guild_id) VALUES('${answer}', '${guildId}');`
  );
  console.log(`Inserted ${insertRow.rowCount} row`);
  await client.end();
};

const handleAddingAnswerToDatabase = (message, args) => {
  const [questionType, ...restArgs] = args;

  switch (removeDiacritics(questionType)) {
    case "dlaczego":
      addAnswerToDatabase("why_answers", restArgs.join(" "), message.guildId);
      break;
    case "czy":
      addAnswerToDatabase("does_answers", restArgs.join(" "), message.guildId);
      break;
    case "kiedy":
      addAnswerToDatabase("when_answers", restArgs.join(" "), message.guildId);
      break;
    case "myslisz":
      addAnswerToDatabase(
        "do_you_think_answers",
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

  message.reply("Chyba dodane");
};

module.exports = {
  name: "naucz",
  description: "Naucz Czarusia odpowiedzi",
  usage: "!naucz",
  execute: (message, args) => main(message, args),
};
