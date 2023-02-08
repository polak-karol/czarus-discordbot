const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
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
    .setName("fuzja")
    .setDescription("Połącz użytkowników w jedność.")
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
    .setDescription("Potwierdź użytkownika.")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("3000years")
    .setDescription("It has been 3000 years meme.")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("crush")
    .setDescription("Okaż swoje uczucie drugiej osobie.")
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

rest
  .put(
    Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
    { body: slashCommands }
  )
  .then(() => console.log("Slash Commands created successfully"));

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
