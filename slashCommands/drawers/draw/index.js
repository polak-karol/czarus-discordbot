import { EmbedBuilder } from '@discordjs/builders'
import moment from 'moment'
import _ from 'lodash'
import {
  hasArgs,
  noArgsMessage,
  getRandomInteger,
  convertArgName,
  capitalizeFirstLetter,
} from '../../../utils/index.js'
import { agent } from '../../../api/agent.js'

const result = []
const selectedCategories = []
const selectedMusicCategories = []
let drawConfig, writingCategories, musicCategories

const drawerTypes = {
  music_challenge: 'music',
  writing_challenge: 'writing',
}

const embedColors = {
  0: '#ffafaa',
  1: '#ff9f99',
  2: '#ff8f88',
  3: '#ff7f77',
  4: '#ff6f66',
  5: '#ff5f55',
  6: '#ff4f44',
  7: '#ff3f33',
  8: '#ff2f22',
  9: '#ff1f11',
  10: '#fa0000',
}

const setResult = (name, value, inline = true) =>
  result.push({ name: convertArgName(name), value, inline })

const getDrawConfig = async (interaction) => {
  const response = await agent.Draws.getDrawConfigs(interaction.guildId).then(
    (response) => response,
    () => false,
  )

  return response
}

const setFieldSpacing = (direction) =>
  direction === 'bottom'
    ? result.push({ name: '\u200B', value: '\u200B' })
    : result.unshift({ name: '\u200B', value: '\u200B' })

const drawWriting = async () => {
  result.length = 0

  const { writingConfig } = drawConfig
  selectedCategories.forEach((selectedCategory) => {
    const formatedSelectedCategory = selectedCategory.toLowerCase()

    setResult(
      selectedCategory,
      capitalizeFirstLetter(
        writingConfig[formatedSelectedCategory][
          getRandomInteger(0, writingConfig[formatedSelectedCategory]?.length)
        ],
      ),
    )
  })

  selectedCategories.length = 0
}

const drawMusic = async () => {
  result.length = 0

  const { musicConfig } = drawConfig

  selectedMusicCategories.forEach((selectedCategory) => {
    const formatedSelectedCategory = selectedCategory.toLowerCase()
    setResult(
      selectedCategory,
      capitalizeFirstLetter(
        musicConfig[formatedSelectedCategory][
          getRandomInteger(0, musicConfig[formatedSelectedCategory]?.length)
        ],
      ),
    )
  })

  selectedMusicCategories.length = 0
}

const saveDrawer = async (interaction, type) => {
  const body = {
    userId: interaction.user.id,
    drawType: drawerTypes[type],
  }

  const response = await agent.Drawers.updateDrawer(interaction.guildId, body).then(
    (response) => response,
    () => false,
  )

  return response
}

const getResultEmbed = (interaction, type) =>
  new EmbedBuilder()
    .setColor(embedColors[result?.length])
    .setTitle('Wylosowano dla Ciebie:')
    .addFields(result)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL({ dynamic: true }),
    })
    .setFooter({
      text: type === 'music_challenge' ? 'Połamania klawiszy' : 'Połamania pióra!',
    })

const setSelectedCategories = (interaction, type) => {
  if (type === 'music_challenge')
    musicCategories.forEach((category) => {
      const selectedCategory = interaction.options.getString(category)
      if (selectedCategory === 'true') selectedMusicCategories.push(category)
    })
  else
    writingCategories.forEach((category) => {
      const selectedCategory = interaction.options.getString(category)
      if (selectedCategory === 'true') selectedCategories.push(category)
    })
}

const handleDrawConfig = async (interaction) => {
  const drawConfigResponse = await getDrawConfig(interaction)
  if (!drawConfigResponse) return false

  drawConfig = drawConfigResponse.data

  writingCategories = Object.entries(drawConfig.writingConfig)
    .filter(([, value]) => !_.isEmpty(value))
    .map(([key]) => key)
  musicCategories = Object.entries(drawConfig.musicConfig)
    .filter(([, value]) => !_.isEmpty(value))
    .map(([key]) => key)

  return true
}

const main = async (interaction) => {
  await interaction.deferReply()
  const type = interaction.options.getSubcommand()

  if (!type)
    return await interaction.editReply('Musisz wybrać typ wyzwania którego chcesz losować.')

  const handleDrawConfigResult = await handleDrawConfig(interaction)

  if (!handleDrawConfigResult) return await interaction.editReply('Coś poszło nie po mojej myśli.')

  setSelectedCategories(interaction, type)

  if (!hasArgs(selectedCategories) && !hasArgs(selectedMusicCategories))
    return await interaction.editReply(noArgsMessage)

  if (type === 'music_challenge') drawMusic()
  else drawWriting()

  const saveDrawerResult = await saveDrawer(interaction, type)

  if (!saveDrawerResult) return await interaction.editReply('Coś poszło nie po mojej myśli.')

  if ('lastVoteDate' in saveDrawerResult)
    return await interaction.editReply(
      `Ty spryciarzu... 😝 nieładnie tak oszukiwać, następne losowanie jest dopiero ${moment()
        .startOf('isoweek')
        .add(7, 'days')
        .set({ s: 0, m: 0, h: 0 })
        .locale('pl')
        .fromNow()}!`,
    )

  setFieldSpacing('bottom')

  return await interaction.editReply({
    embeds: [getResultEmbed(interaction, type)],
  })
}

export default {
  name: 'draw',
  description: 'No description',
  execute: (interaction) => main(interaction),
}
