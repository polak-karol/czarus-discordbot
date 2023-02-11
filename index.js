const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageTyping,
  ],
});

const slashCommands = [
  new SlashCommandBuilder().setName("ping").setDescription("Ping pong!"),
  new SlashCommandBuilder()
    .setName("urodziny")
    .setDescription("Urodziny")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("zapamietaj")
        .setDescription(
          "Napisz Czarkowi, kiedy masz urodziny, żeby mógł złożyć Ci życzenia."
        )
        .addNumberOption((option) =>
          option
            .setName("dzien")
            .setDescription("Dzień urodzin")
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("miesiac")
            .setDescription("Miesiąc urodzin")
            .setMinValue(1)
            .setMaxValue(12)
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("rok")
            .setDescription("Miesiąc urodzin")
            .setMinValue(new Date().getFullYear() - 150)
            .setMaxValue(new Date().getFullYear())
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("zapomnij")
        .setDescription(
          "Powiedz Czarusiowi, żeby zapomniał o Twoich urodzinach."
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("kiedy")
        .setDescription("Spytaj Czarusie kiedy są czyjeś urodziny")
        .addUserOption((option) =>
          option
            .setName("uzytkownik")
            .setDescription("Dowolny użytkownik serwera.")
            .setRequired(true)
        )
    ),
  new SlashCommandBuilder()
    .setName("kaczka")
    .setDescription("Kwa kwa! Z dedykacją dla Oliwii i Kraba."),
  new SlashCommandBuilder()
    .setName("ktowygra")
    .setDescription("ktowygra")
    .addUserOption((option) =>
      option
        .setName("uzytkownik1")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("uzytkownik2")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("wasted")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("poszukiwany")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("tobecontinued")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("snajper")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("straszny")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("rip")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("odrzuc")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("wasik")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("missionpassed")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("wiezienie")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("ogien")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("dyktator")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("spal")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("piekny")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("plaskacz")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik1")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("uzytkownik2")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("fuzja")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik1")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("uzytkownik2")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("potwierdz")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("3000years")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("crush")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("losuj")
    .setDescription("Losuje wybrane kategorie do wyzwania pisarskiego.")
    .addStringOption((option) =>
      option
        .setName("gatunek")
        .setDescription("Czy chcesz wylosować gatunek pracy?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("narracja")
        .setDescription("Czy chcesz wylosować narrację utworu?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("temat")
        .setDescription("Czy chcesz wylosować temat przewodni?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("zakres_slow")
        .setDescription("Czy chcesz wylosować wymagany zakres słów w utworze?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("wymagane_slowo")
        .setDescription(
          "Czy chcesz wylosować słowo, które musi znaleźć się w utworze?"
        )
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("zabronione_slowo")
        .setDescription(
          "Czy chcesz wylosować słowo, które nie może zostać użyte w pracy?"
        )
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("postac")
        .setDescription("Czy chcesz wylosować postać do utworu?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("miejsce")
        .setDescription("Czy chcesz wylosować miejsce rozgrywania się akcji?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: 10 }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${slashCommands.length} application (/) commands.`
    );

    let data;
    if (process.env.ENVIRONMENT !== "production")
      data = await rest.put(
        Routes.applicationGuildCommands(
          process.env.BOT_ID,
          process.env.GUILD_ID
        ),
        { body: slashCommands }
      );
    else
      data = await rest.put(Routes.applicationCommand(process.env.BOT_ID), {
        body: slashCommands,
      });

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();

client.slashCommands = new Collection();
const slashCommandsFolders = fs.readdirSync("./slash-commands");

slashCommandsFolders.forEach((folder) => {
  const slashCommandFiles = fs
    .readdirSync(`./slash-commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  slashCommandFiles.forEach((file) => {
    const command = require(`./slash-commands/${folder}/${file}`);
    client.slashCommands.set(command.name, command);
  });
});

client.commands = new Collection();
const commandFolders = fs.readdirSync("./commands");

commandFolders.forEach((folder) => {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith(".js"));

  commandFiles.forEach((file) => {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  });
});

const eventFiles = fs
  .readdirSync("./events")
  .filter((file) => file.endsWith(".js"));

for (const eventFile of eventFiles) {
  const event = require(`./events/${eventFile}`);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

client.login(process.env.CLIENT_TOKEN);
