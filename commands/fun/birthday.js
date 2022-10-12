const { MessageEmbed } = require("discord.js");
const { getClient } = require("../../database/getClient");
const { hasArgs, isHelpArg } = require("../../utils");
const moment = require("moment");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!urodziny")
    .setDescription(
      "Daj znać Czarkowi kiedy masz urodziny, żeby mógł Ci złożyć życzenia!"
    );

const saveBirthdayDate = async (message, args) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM birthdays WHERE guild_id = '${message.guildId}' AND user_id = '${message.author.id}'`
  );

  if (parseInt(countResult.rows[0].count, 10) === 0) {
    await client.query(
      `INSERT INTO birthdays(date, is_anonymous, user_id, guild_id) VALUES ('${
        args[0]
      }', ${!!args[1]}, '${message.author.id}', '${message.guildId}');`
    );
  } else {
    await client.query(
      `UPDATE birthdays SET date = '${
        args[0]
      }', is_anonymous = ${!!args[1]} WHERE guild_id = '${
        message.guildId
      }' AND user_id = '${message.author.id}';`
    );
  }

  await client.end();
};

const main = async (message, args) => {
  if (isHelpArg(args) || !hasArgs(args))
    return message.reply({ embeds: [getHelpEmbed()] });

  saveBirthdayDate(message, args);

  const nextBirthday = moment(args[0]).set({
    year: moment().year(),
  });

  if (nextBirthday.isSame(moment(), "day")) {
    message.reply("Wszystkiego najlepszego! 🥳🥳🥳");
    return;
  }

  if (nextBirthday.isBefore(moment(), "day"))
    nextBirthday.set({
      year: moment().add(1, "y").year(),
    });

  message.reply(
    `Zapamiętałem, Twoje urodziny będą ${nextBirthday.locale("pl").fromNow()}.`
  );
  return;
};

module.exports = {
  name: "urodziny",
  description: "Zapytaj o urodziny",
  usage: "!urodziny",
  execute: (message, args) => main(message, args),
};
