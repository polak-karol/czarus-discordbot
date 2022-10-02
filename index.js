const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { setupDatabase } = require("./database/setupDatabase");
const { sendDailyHolidayInfo } = require("./jobs/holiday");
const { removeDiacritics } = require("./utils");
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

client.once("ready", () => {
  console.log("Bot is online");
  setupDatabase();
  sendDailyHolidayInfo(client);
  client.user.setActivity("starożytne księgi", { type: "WATCHING" });
});

client.on("messageCreate", async (message) => {
  const { member, guild, channel, content } = message;

  if (!content.toLowerCase().startsWith(prefix) || message.author.bot) return;

  const args = content.slice(prefix.length).trim().split(/ +/);
  const commandName = removeDiacritics(args.shift().toLowerCase());

  if (!client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply({
      content: "Daj mi chwilkę... trochę się zmęczyłem.",
      ephemeral: true,
    });
  }
});

client.login(process.env.CLIENT_TOKEN);
