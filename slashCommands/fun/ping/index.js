export default {
  name: 'ping',
  execute: async (interaction) => {
    await interaction.reply('Pong!')
  },
}
