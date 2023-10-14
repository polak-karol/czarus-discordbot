import { EmbedBuilder } from '@discordjs/builders'
import { getRandomInteger, hasArgs, isHelpArg } from '../../utils'
import { getAnswers } from '../../utils/commands/funUtils'

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle('!dlaczego')
    .setDescription('Zapytaj mnie dlaczego...? \n Przykład: `!dlaczego ciągle czytasz?`')

const main = async (message, args) => {
  if (!hasArgs(args)) return message.reply('Dlaczego co?')
  if (isHelpArg(args)) return message.reply({ embeds: [getHelpEmbed()] })

  const answers = await getAnswers('whyAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  return message.reply(answers[getRandomInteger(0, answers.length)])
}

export default {
  name: 'dlaczego',
  description: 'Zapytaj mnie dlaczego...?',
  usage: '!dlaczego',
  execute: (message, args) => main(message, args),
}
