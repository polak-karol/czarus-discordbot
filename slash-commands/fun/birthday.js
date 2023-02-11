const { getClient } = require("../../database/getClient");
const { getRandomInteger } = require("../../utils");
const moment = require("moment-timezone");
const { wishesSingular } = require("../../utils/jobs/birthdayUtils");

const saveBirthdayDate = async (interaction, birthday) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM birthdays WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}'`
  );

  if (parseInt(countResult.rows[0].count, 10) === 0) {
    await client.query(
      `INSERT INTO birthdays(date, is_anonymous, user_id, guild_id) VALUES ('${birthday}', ${!!interaction.options.getNumber(
        "rok"
      )}, '${interaction.user.id}', '${interaction.guildId}');`
    );
  } else {
    await client.query(
      `UPDATE birthdays SET date = '${birthday}', is_anonymous = ${!!interaction.options.getNumber(
        "rok"
      )} WHERE guild_id = '${interaction.guildId}' AND user_id = '${
        interaction.user.id
      }';`
    );
  }

  await client.end();
};

const getUserBirthdays = async (interaction) => {
  const client = await getClient();
  const userBirthday = await client.query(
    `SELECT date FROM birthdays WHERE guild_id = '${
      interaction.guildId
    }' AND user_id = '${interaction.options.getUser("uzytkownik").id}'`
  );
  await client.end();
  return userBirthday?.rows?.[0]?.date;
};

const deleteBirthday = async (interaction) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM birthdays WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}'`
  );
  if (parseInt(countResult.rows[0].count, 10) === 0) return false;
  const result = await client.query(
    `DELETE FROM birthdays WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}'`
  );
  await client.end();
  return result;
};

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) ||
  (year % 100 === 0 && year % 400 === 0);

const getYear = (day, month, year) => {
  if (day === 29 && month === 2) return isLeapYear(year) ? year : 2020;

  return year;
};

const handleRememberCommand = async (interaction) => {
  const day = interaction.options.getNumber("dzien");
  const month = interaction.options.getNumber("miesiac");
  const year = interaction.options.getNumber("rok") || moment().year();

  let birthday = moment(
    `${day}-${month}-${getYear(day, month, year)}`,
    "DD-MM-YYYY"
  );
  if (!birthday.isValid())
    return await interaction.editReply(
      "Przepraszam, ale ta data jest niepoprawna 🥺"
    );
  saveBirthdayDate(interaction, birthday);

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

  return interaction.editReply(
    `Zapamiętałem, Twoje urodziny będą ${nextBirthday
      .tz("Europe/Warsaw")
      .locale("pl")
      .fromNow()}.`
  );
};

const handleForgetCommand = async (interaction) => {
  const result = await deleteBirthday(interaction);
  return await interaction.editReply(
    result
      ? "Zapomniałem o Twoich urodzinach."
      : "Coś poszło nie po mojej myśli... 🥺"
  );
};

const handleWhenCommand = async (interaction) => {
  const userBirthday = await getUserBirthdays(interaction);
  if (userBirthday)
    return await interaction.editReply(
      `${interaction.user.username} ma urodziny ${moment(userBirthday)
        .locale("pl")
        .format("DD MMMM")}`
    );

  return await interaction.editReply("Niestety nie pamiętam tej daty 🥺");
};

const main = async (interaction) => {
  await interaction.deferReply();

  switch (interaction.options.getSubcommand()) {
    case "zapamietaj":
      return handleRememberCommand(interaction);
    case "zapomnij":
      return handleForgetCommand(interaction);
    case "kiedy":
      return handleWhenCommand(interaction);
    default:
      return await interaction.editReply(
        "Nie bardzo rozumiem o co Ci chodzi 🥺"
      );
  }
};

module.exports = {
  name: "urodziny",
  execute: (interaction) => main(interaction),
};
