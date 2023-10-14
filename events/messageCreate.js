import { removeDiacritics } from '../utils/index'

const PREFIX = '!'

export default {
  name: 'messageCreate',
  async execute(message, client) {
    const { member, guild, channel, content } = message

    if (!content.toLowerCase().startsWith(PREFIX) || message.author.bot) return

    const args = content.slice(PREFIX.length).trim().split(/ +/)
    const commandName = removeDiacritics(args.shift().toLowerCase())

    if (!client.commands.has(commandName)) return

    const command = client.commands.get(commandName)

    try {
      await command.execute(message, args)
    } catch (error) {
      console.error(error)
      await message.reply({
        content: 'Daj mi chwilkę... trochę się zmęczyłem.',
        ephemeral: true,
      })
    }
  },
}
