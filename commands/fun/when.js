const { EmbedBuilder } = require('discord.js')
const { getRandomInteger, hasArgs, isHelpArg } = require('../../utils')
const { getAnswers } = require('../../utils/commands/funUtils')

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle('!kiedy')
    .setDescription('Zapytaj mnie kiedy...? \n Przykład: `!kiedy skończysz czytać?`')

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply('Kiedy co?')
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] })

  const answers = await getAnswers('whenAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  return message.reply(answers[getRandomInteger(0, answers.length)])
}

module.exports = {
  name: 'kiedy',
  description: 'Zapytaj mnie kiedy...?',
  usage: '!kiedy',
  execute: (message, args) => main(message, args),
}
