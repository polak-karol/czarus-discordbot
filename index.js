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
].map((command) => command.toJSON());

const rest = new REST({ version: 10 }).setToken(process.env.CLIENT_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
    { body: slashCommands }
  )
  .then(() => console.log("Slash Commands created successfully"));

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
