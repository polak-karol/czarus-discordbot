const { MessageEmbed } = require("discord.js");
const { getClient } = require("../../database/getClient");
const { hasArgs, isHelpArg, getRandomInteger } = require("../../utils");
const moment = require("moment-timezone");
const { wishesSingular } = require("../../utils/jobs/birthdayUtils");

const dateRegex = new RegExp("[0-9][0-9][0-9][0-9]-[0-1][0-9]-[1-3][0-9]");
const shortDateRegex = new RegExp("[0-1][0-9]-[1-3][0-9]");

const getHelpEmbed = () =>
  new MessageEmbed()
    .setTitle("!urodziny")
    .setDescription(
      "Daj znać Czarkowi kiedy masz urodziny, żeby mógł Ci złożyć życzenia!"
    );

const saveBirthdayDate = async (message, birthday) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM birthdays WHERE guild_id = '${message.guildId}' AND user_id = '${message.author.id}'`
  );

  if (parseInt(countResult.rows[0].count, 10) === 0) {
    await client.query(
      `INSERT INTO birthdays(date, is_anonymous, user_id, guild_id) VALUES ('${birthday}', ${
        moment(birthday).year() === moment().year()
      }, '${message.author.id}', '${message.guildId}');`
    );
  } else {
    await client.query(
      `UPDATE birthdays SET date = '${birthday}', is_anonymous = ${
        moment(birthday).year() === moment().year()
      } WHERE guild_id = '${message.guildId}' AND user_id = '${
        message.author.id
      }';`
    );
  }

  await client.end();
};

const main = async (message, args) => {
  if (isHelpArg(args) || !hasArgs(args))
    return message.reply({ embeds: [getHelpEmbed()] });

  if (!shortDateRegex.test(args[0]) && !dateRegex.test(args[0]))
    return message.reply(
      "Podałeś błędnie datę 🥺. Wymagany jest format: YYYY-MM-DD"
    );

  let birthday = args[0];

  if (shortDateRegex.test(args[0]) && !dateRegex.test(args[0]))
    birthday = `${moment().year()}-${args[0]}`;

  saveBirthdayDate(message, birthday);

  const nextBirthday = moment(birthday).set({
    year: moment().year(),
  });

  if (nextBirthday.isSame(moment(), "day")) {
    message.reply(wishesSingular[getRandomInteger(0, wishesSingular.length)]);
    return;
  }

  if (nextBirthday.isBefore(moment(), "day"))
    nextBirthday.set({
      year: moment().add(1, "y").year(),
    });

  return message.reply(
    `Zapamiętałem, Twoje urodziny będą ${nextBirthday
      .tz("Europe/Warsaw")
      .locale("pl")
      .fromNow()}.`
  );
};

module.exports = {
  name: "urodziny",
  description: "Zapytaj o urodziny",
  usage: "!urodziny",
  execute: (message, args) => main(message, args),
};
