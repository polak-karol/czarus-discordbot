const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { DatabaseClient } = require("./database");
require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
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

const prefix = "!";

console.log(process.env.DB_HOST);
console.log(process.env.DB_USER);
console.log(process.env.DB_PORT);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_NAMEE);
DatabaseClient.connect();

console.log(DatabaseClient);

DatabaseClient.query(`SELECT * FROM test;`, (error, res) => {
  if (!error) {
    console.log(res.rows);
  } else {
    console.log(error.message);
  }

  DatabaseClient.end;
});

client.once("ready", () => {
  console.log("Bot is online");

  client.user.setActivity("starożytne księgi", { type: "WATCHING" });
});

client.on("messageCreate", async (message) => {
  const { member, guild, channel, content } = message;

  if (!content.toLowerCase().startsWith(prefix) || message.author.bot) return;

  const args = content.toLowerCase().slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.CLIENT_TOKEN);
