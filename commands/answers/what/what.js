import { EmbedBuilder } from '@discordjs/builders'
import { getRandomInteger, hasArgs, isHelpArg, removeDiacritics } from '../../../utils/index.js'
import { getAnswers } from '../../../utils/commands/funUtils.js'

const getHelpEmbed = () =>
  new EmbedBuilder()
    .setTitle('!co myślisz o')
    .setDescription('Zapytaj mnie co myślę o...? \n Przykład: `!co myślisz o mnie?`')

const isThinkQuestion = (args) =>
  removeDiacritics(args[0]) === 'myslisz' && removeDiacritics(args[1]) === 'o'

const handleThinkQuestion = async (message, args) => {
  const [, , ...restArgs] = args

  if (!hasArgs(restArgs)) return message.reply('Co myślę o?')

  if (isHelpArg(restArgs)) return message.reply({ embeds: [getHelpEmbed()] })

  const answers = await getAnswers('whatDoYouThinkAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  message.reply(answers[getRandomInteger(0, answers.length)])
}

const isJudgeQuestion = (args) =>
  removeDiacritics(args[0]).toLowerCase() === 'sadzisz' &&
  removeDiacritics(args[1]).toLowerCase() === 'o'

const isLlamaQuestion = (args) =>
  removeDiacritics(args[0]) === 'mowi' &&
  removeDiacritics(args[1]) === 'lama' &&
  removeDiacritics(args[2]) === 'do' &&
  removeDiacritics(args[3]) === 'lamy'

const main = async (message, args) => {
  if (isThinkQuestion(args)) return handleThinkQuestion(message, args)
  if (isLlamaQuestion(args)) return message.reply('||spierdalamy||')
  if (isJudgeQuestion(args)) return message.reply('Od sądzenia jest sąd!')
  if (!hasArgs(args)) return message.reply('Co co?')

  const answers = await getAnswers('whatAnswers', message.guildId)

  if (!answers?.length) return message.reply('Nie wiem co odpowiedzieć. :(')

  return message.reply(answers[getRandomInteger(0, answers.length)])
}

export default {
  name: 'co',
  description: 'Zapytaj mnie co...?',
  usage: '!co',
  execute: (message, args) => main(message, args),
}
