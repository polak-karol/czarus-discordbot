export default {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.isCommand()) return

    const { commandName } = interaction

    if (!client.slashCommands.has(commandName)) return

    const slashCommand = client.slashCommands.get(commandName)

    try {
      await slashCommand.execute(interaction, client)
    } catch (error) {
      console.error(error)
      await interaction.reply({
        content: 'Daj mi chwilkę... trochę się zmęczyłem.',
        ephemeral: true,
      })
    }
  },
}
