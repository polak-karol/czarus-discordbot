import { EmbedBuilder } from '@discordjs/builders'
import { getRandomInteger, hasArgs, isHelpArg } from '../../utils'
import { getAnswers } from '../../utils/commands/funUtils'

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle('!czym jest')
    .setDescription('Zapytaj mnie czym jest...? \n Przykład: `!czym jest magia słów?`')

const main = async (message, args) => {
  const [firstArg, ...restArgs] = args

  if (firstArg !== 'jest') return message.reply('Czym co?')
  if (!hasArgs(restArgs)) return message.reply('Czym jest co?')
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] })

  const answers = await getAnswers('whatIsAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  return message.reply(answers[getRandomInteger(0, answers.length)])
}

export default {
  name: 'czym',
  description: 'Zapytaj mnie czym...?',
  usage: '!czym',
  execute: (message, args) => main(message, args),
}
