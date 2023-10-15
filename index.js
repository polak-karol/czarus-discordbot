import { Client, GatewayIntentBits, Collection, REST, Routes } from 'discord.js'
import 'dotenv/config'
import slashCommandsConfig from './slashCommands/config.js'
import slashCommands from './slashCommands/index.js'
import commands from './commands/index.js'
import events from './events/index.js'

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
})

const rest = new REST({ version: 10 }).setToken(process.env.CLIENT_TOKEN)

;(async () => {
  try {
    console.log(`Started refreshing ${slashCommandsConfig.length} application (/) commands.`)

    let data
    if (process.env.ENVIRONMENT === 'production')
      data = await rest.put(Routes.applicationCommands(process.env.BOT_ID), {
        body: slashCommandsConfig,
      })
    else
      data = await rest.put(
        Routes.applicationGuildCommands(process.env.BOT_ID, process.env.GUILD_ID),
        { body: slashCommandsConfig },
      )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
})()

client.slashCommands = new Collection()
slashCommands.forEach((slashCommand) => client.slashCommands.set(slashCommand.name, slashCommand))

client.commands = new Collection()
commands.forEach((command) => client.commands.set(command.name, command))

events.forEach((event) => {
  if (event.once) client.once(event.name, (...args) => event.execute(...args, client))
  else client.on(event.name, (...args) => event.execute(...args, client))
})

client.login(process.env.CLIENT_TOKEN)
