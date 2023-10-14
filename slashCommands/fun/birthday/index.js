import moment from 'moment-timezone'
import { getRandomInteger, isLeapYear } from '../../../utils'
import { wishesSingular } from '../../../utils/jobs/birthdayUtils'
import { agent } from '../../../api/agent'

const saveBirthdayDate = async (interaction, birthday) => {
  const body = {
    date: birthday.toISOString(),
    userId: interaction.user.id,
    isAnonymous: !!interaction.options.getNumber('year'),
  }

  const response = await agent.Birthdays.updateBirthday(interaction.guildId, body)

  return response
}

const getUserBirthdays = async (interaction) => {
  const response = agent.Birthdays.getBirthday(
    interaction.guildId,
    interaction.options.getUser('user').id,
  )

  return response.data.date
}

const deleteBirthday = async (interaction) => {
  const response = agent.Birthdays.deleteBirthday(interaction.guildId, interaction.user.id)

  return response
}

const getYear = (day, month, year) => {
  if (day === 29 && month === 2) return isLeapYear(year) ? year : 2020

  return year
}

const handleRememberCommand = async (interaction) => {
  const day = interaction.options.getNumber('day')
  const month = interaction.options.getNumber('month')
  const year = interaction.options.getNumber('year') || moment().year()

  let birthday = moment(`${day}-${month}-${getYear(day, month, year)}`, 'DD-MM-YYYY')

  if (!birthday.isValid())
    return await interaction.editReply('Przepraszam, ale ta data jest niepoprawna 🥺')

  saveBirthdayDate(interaction, birthday)

  const nextBirthday = moment(birthday).set({
    year: moment().year(),
  })

  if (nextBirthday.isSame(moment(), 'day'))
    return interaction.editReply(wishesSingular[getRandomInteger(0, wishesSingular.length)])

  if (nextBirthday.isBefore(moment(), 'day'))
    nextBirthday.set({
      year: moment().add(1, 'y').year(),
    })

  return interaction.editReply(
    `Zapamiętałem, Twoje urodziny będą ${nextBirthday.tz('Europe/Warsaw').locale('pl').fromNow()}.`,
  )
}

const handleForgetCommand = async (interaction) => {
  const result = await deleteBirthday(interaction)

  return await interaction.editReply(
    result ? 'Zapomniałem o Twoich urodzinach.' : 'Coś poszło nie po mojej myśli... 🥺',
  )
}

const handleWhenCommand = async (interaction) => {
  const userBirthday = await getUserBirthdays(interaction)

  if (userBirthday)
    return await interaction.editReply(
      `${interaction.user.username} ma urodziny ${moment(userBirthday)
        .locale('pl')
        .format('DD MMMM')}`,
    )

  return await interaction.editReply('Niestety nie pamiętam tej daty 🥺')
}

const main = async (interaction) => {
  await interaction.deferReply()

  switch (interaction.options.getSubcommand()) {
    case 'remember':
      return handleRememberCommand(interaction)
    case 'forget':
      return handleForgetCommand(interaction)
    case 'when':
      return handleWhenCommand(interaction)
    default:
      return await interaction.editReply('Nie bardzo rozumiem o co Ci chodzi 🥺')
  }
}

export default {
  name: 'birthdays',
  execute: (interaction) => main(interaction),
}
