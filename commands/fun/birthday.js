const { MessageEmbed } = require("discord.js");
const { getClient } = require("../../database/getClient");
const { hasArgs, isHelpArg } = require("../../utils");

const getHelpEmbed = () =>
  new MessageEmbed().setTitle("!czy").setDescription("Nie wiem");

const saveBirthdayDate = async (message, date) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM birthdays WHERE guild_id = '${message.guildId}' AND user_id = '${message.author.id}'`
  );

  if (parseInt(countResult.rows[0].count, 10) === 0) {
    await client.query(
      `INSERT INTO holidays(date, user_id, guild_id) VALUES ('${date}','${message.author.id}', '${guildId}');`
    );
  } else {
    await client.query(
      `UPDATE holidays SET date = '${date}' WHERE guild_id = '${guildId}' AND user_id = '${message.author.id}';`
    );
  }

  await client.end();
};

const main = async (message, args) => {
  if (isHelpArg(args) || !hasArgs(args))
    return message.reply({ embeds: [getHelpEmbed()] });

  saveBirthdayDate(message, args[0]);

  message.reply("Zapamiętałem.");
};

module.exports = {
  name: "urodziny",
  description: "Zapytaj o urodziny",
  usage: "!urodziny",
  execute: (message, args) => main(message, args),
};
