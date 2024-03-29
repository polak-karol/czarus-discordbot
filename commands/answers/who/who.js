import { EmbedBuilder } from '@discordjs/builders'
import { getRandomInteger, hasArgs, isHelpArg } from '../../../utils/index.js'
import { getAnswers } from '../../../utils/commands/funUtils.js'

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle('!kto')
    .setDescription('Zapytaj mnie kto...? \n Przykład: `!kto Cię stworzył?`')

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply('kto co?')
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] })

  const answers = await getAnswers('whoAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  return message.reply(answers[getRandomInteger(0, answers.length)])
}

export default {
  name: 'kto',
  description: 'Zapytaj mnie kto...?',
  usage: '!kto',
  execute: (message, args) => main(message, args),
}
