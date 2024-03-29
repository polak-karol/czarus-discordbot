import { EmbedBuilder } from '@discordjs/builders'
import { getRandomInteger, hasArgs, isHelpArg } from '../../../utils/index.js'
import { getAnswers } from '../../../utils/commands/funUtils.js'

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle('!jak')
    .setDescription('Zapytaj mnie jak...? \n Przykład: `!jak to robisz?`')

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply('Jak co?')
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] })

  const answers = await getAnswers('howAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  return message.reply(answers[getRandomInteger(0, answers.length)])
}

export default {
  name: 'jak',
  description: 'Zapytaj mnie jak...?',
  usage: '!jak',
  execute: (message, args) => main(message, args),
}
