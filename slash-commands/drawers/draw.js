const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
const _ = require('lodash')
const {
  hasArgs,
  noArgsMessage,
  getRandomInteger,
  convertArgName,
  capitalizeFirstLetter,
} = require('../../utils')
const { drawHelpMessage } = require('../../utils/commands/funUtils')
const { agent } = require('../../api/agent')

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
  const responseBody = await agent.Draws.getDrawConfigs(interaction.guildId)

  return responseBody.data
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
  const responseBody = await agent.Drawers.updateDrawer(interaction.guildId, body)

  return responseBody
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
  drawConfig = await getDrawConfig(interaction)

  writingCategories = Object.entries(drawConfig.writingConfig)
    .filter(([, value]) => !_.isEmpty(value))
    .map(([key]) => key)
  musicConfig = Object.entries(drawConfig.musicConfig)
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

  setSelectedCategories(interaction, type)
  if (!hasArgs(selectedCategories) && !hasArgs(selectedMusicCategories))
    return await interaction.editReply(noArgsMessage)

  if (type === 'music_challenge') drawMusic()
  else drawWriting()

  const saveDrawerResult = await saveDrawer(interaction, type)

  if ('lastVoteDate' in saveDrawerResult)
    return interaction.editReply(
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

module.exports = {
  name: 'draw',
  description: drawHelpMessage,
  execute: (interaction) => main(interaction),
}
