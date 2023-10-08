const moment = require("moment-timezone");
const fetch = require("node-fetch");
const { getRandomInteger } = require("../../utils");
const { wishesSingular } = require("../../utils/jobs/birthdayUtils");

const saveBirthdayDate = async (interaction, birthday) => {
  const response = await fetch(
    `${process.env.API_URL}/birthday/${interaction.guildId}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        "Bot-Authorization": `${process.env.BOT_AUTHORIZATION_TOKEN}`,
      },
      body: JSON.stringify({
        date: birthday.toISOString(),
        userId: interaction.user.id,
        isAnonymous: !!interaction.options.getNumber("rok"),
      }),
    }
  );
};

const getUserBirthdays = async (interaction) => {
  const response = await fetch(
    `${process.env.API_URL}/birthday/${interaction.guildId}?user_id=${
      interaction.options.getUser("uzytkownik").id
    }`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "Bot-Authorization": `${process.env.BOT_AUTHORIZATION_TOKEN}`,
      },
    }
  );
  const responseBody = await response.json();
  return responseBody.data.date;
};

const deleteBirthday = async (interaction) => {
  const response = await fetch(
    `${process.env.API_URL}/birthday/${interaction.guildId}?user_id=${interaction.user.id}`,
    {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        "Bot-Authorization": `${process.env.BOT_AUTHORIZATION_TOKEN}`,
      },
    }
  );

  return true;
};

const isLeapYear = (year) =>
  (year % 4 === 0 && year % 100 !== 0) ||
  (year % 100 === 0 && year % 400 === 0);

const getYear = (day, month, year) => {
  if (day === 29 && month === 2) return isLeapYear(year) ? year : 2020;

  return year;
};

const handleRememberCommand = async (interaction) => {
  const day = interaction.options.getNumber("day");
  const month = interaction.options.getNumber("month");
  const year = interaction.options.getNumber("year") || moment().year();

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
    interaction.editReply(
      wishesSingular[getRandomInteger(0, wishesSingular.length)]
    );
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
    case "remember":
      return handleRememberCommand(interaction);
    case "forget":
      return handleForgetCommand(interaction);
    case "when":
      return handleWhenCommand(interaction);
    default:
      return await interaction.editReply(
        "Nie bardzo rozumiem o co Ci chodzi 🥺"
      );
  }
};

module.exports = {
  name: "birthdays",
  execute: (interaction) => main(interaction),
};
