const { Client, GatewayIntentBits, Collection } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const fs = require("fs");
const { slashCommands } = require("./commands");
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

const rest = new REST({ version: 10 }).setToken(process.env.CLIENT_TOKEN);

(async () => {
  try {
    console.log(
      `Started refreshing ${slashCommands.length} application (/) commands.`
    );

    let data;
    if (process.env.ENVIRONMENT === "production")
      data = await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
        body: slashCommands,
      });
    else
      data = await rest.put(
        Routes.applicationGuildCommands(
          process.env.BOT_ID,
          process.env.GUILD_ID
        ),
        { body: slashCommands }
      );

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

client.commands = new Collection();;
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
