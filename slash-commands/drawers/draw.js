const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const {
  hasArgs,
  noArgsMessage,
  getRandomInteger,
  convertArgName,
  removeDiacritics,
  capitalizeFirstLetter,
} = require("../../utils");
const { drawHelpMessage } = require("../../utils/commands/funUtils");
const { agent } = require("../../api/agent");

const result = [];

const drawerTypes = {
  music_challenge: "music",
  writing_challenge: "writing",
};

const embedColors = {
  0: "#ffafaa",
  1: "#ff9f99",
  2: "#ff8f88",
  3: "#ff7f77",
  4: "#ff6f66",
  5: "#ff5f55",
  6: "#ff4f44",
  7: "#ff3f33",
  8: "#ff2f22",
  9: "#ff1f11",
  10: "#fa0000",
};

const categories = [
  "theme",
  "narration",
  "required_word",
  "forbidden_word",
  "genre",
  "words_range",
  "character",
  "place",
];

const musicCategories = [
  "rate",
  "rhythm",
  "key",
  "required_key",
  "forbidden_key",
  "genre",
  "required_instrument",
  "forbidden_instrument",
  "mood",
];

const selectedCategories = [];

const selectedMusicCategories = [];

const setResult = (name, value, inline = true) => {
  result.push({ name: convertArgName(name), value, inline });
};

const getDrawConfig = async (interaction) => {
  const responseBody = await agent.Draws.getDrawConfigs(interaction.guildId);
  console.log(responseBody);
  return responseBody.data;
};

const setFieldSpacing = (direction) =>
  direction === "bottom"
    ? result.push({ name: "\u200B", value: "\u200B" })
    : result.unshift({ name: "\u200B", value: "\u200B" });

const draw = async (interaction) => {
  result.length = 0;

  const { writingConfig } = await getDrawConfig(interaction);

  selectedCategories.forEach((selectedCategory) => {
    switch (removeDiacritics(selectedCategory.toLowerCase())) {
      case "theme":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.theme[
              getRandomInteger(0, writingConfig.theme?.length)
            ]
          )
        );
        break;
      case "narration":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.narration[
              getRandomInteger(0, writingConfig.narration?.length)
            ]
          )
        );
        break;
      case "required_word":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.requiredWord[
              getRandomInteger(0, writingConfig.requiredWord?.length)
            ]
          )
        );
        break;
      case "forbidden_word":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.forbiddenWord[
              getRandomInteger(0, writingConfig.forbiddenWord?.length)
            ]
          )
        );
        break;
      case "genre":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.genre[
              getRandomInteger(0, writingConfig.genre?.length)
            ]
          )
        );
        break;
      case "words_range":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.wordsRange[
              getRandomInteger(0, writingConfig.wordsRange?.length)
            ]
          )
        );
        break;
      case "character":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.character[
              getRandomInteger(0, writingConfig.character?.length)
            ]
          )
        );
        break;
      case "place":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            writingConfig.place[
              getRandomInteger(0, writingConfig.place?.length)
            ]
          )
        );
        break;
      default:
        break;
    }
  });

  selectedCategories.length = 0;
};

const drawMusic = async (interaction) => {
  result.length = 0;

  const { musicConfig } = await getDrawConfig(interaction);

  selectedMusicCategories.forEach((selectedCategory) => {
    switch (removeDiacritics(selectedCategory.toLowerCase())) {
      case "rate":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.rate[getRandomInteger(0, musicConfig.rate?.length)]
          )
        );
        break;
      case "rhythm":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.rhythm[getRandomInteger(0, musicConfig.rhythm?.length)]
          )
        );
        break;
      case "key":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.key[getRandomInteger(0, musicConfig.key?.length)]
          )
        );
        break;
      case "required_key":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.requiredKey[
              getRandomInteger(0, musicConfig.requiredKey?.length)
            ]
          )
        );
        break;
      case "forbidden_key":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.forbiddenKey[
              getRandomInteger(0, musicConfig.forbiddenKey?.length)
            ]
          )
        );
        break;
      case "genre":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.musicGenre[
              getRandomInteger(0, musicConfig.musicGenre?.length)
            ]
          )
        );
        break;
      case "required_instrument":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.requiredInstrument[
              getRandomInteger(0, musicConfig.requiredInstrument?.length)
            ]
          )
        );
        break;
      case "forbidden_instrument":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.forbiddenInstrument[
              getRandomInteger(0, musicConfig.forbiddenInstrument?.length)
            ]
          )
        );
        break;
      case "mood":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicConfig.mood[getRandomInteger(0, musicConfig.mood?.length)]
          )
        );
        break;
      default:
        break;
    }
  });

  selectedMusicCategories.length = 0;
};

const saveDrawer = async (interaction, type) => {
  const body = {
    userId: interaction.user.id,
    drawType: drawerTypes[type],
  };
  const responseBody = await agent.Drawers.updateDrawer(
    interaction.guildId,
    body
  );
  console.log(responseBody);

  return responseBody;
};

const getResultEmbed = (interaction, type) =>
  new EmbedBuilder()
    .setColor(embedColors[result?.length])
    .setTitle("Wylosowano dla Ciebie:")
    .addFields(result)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL({ dynamic: true }),
    })
    .setFooter({
      text:
        type === "music_challenge" ? "Połamania klawiszy" : "Połamania pióra!",
    });

const setSelectedCategories = (interaction, type) => {
  if (type === "music_challenge")
    musicCategories.forEach((category) => {
      const selectedCategory = interaction.options.getString(category);
      if (selectedCategory === "true") selectedMusicCategories.push(category);
    });
  else
    categories.forEach((category) => {
      const selectedCategory = interaction.options.getString(category);
      if (selectedCategory === "true") selectedCategories.push(category);
    });
};

const main = async (interaction) => {
  await interaction.deferReply();
  const type = interaction.options.getSubcommand();

  if (!type)
    return await interaction.editReply(
      "Musisz wybrać typ wyzwania którego chcesz losować."
    );
  if (!hasArgs(selectedCategories) && !hasArgs(selectedMusicCategories))
    return await interaction.editReply(noArgsMessage);

  setSelectedCategories(interaction, type);

  if (type === "music_challenge") drawMusic(interaction);
  else draw(interaction);

  const saveDrawerResult = await saveDrawer(interaction, type);

  if ("lastVoteDate" in saveDrawerResult)
    return interaction.editReply(
      `Ty spryciarzu... 😝 nieładnie tak oszukiwać, następne losowanie jest dopiero ${moment()
        .startOf("isoweek")
        .add(7, "days")
        .set({ s: 0, m: 0, h: 0 })
        .locale("pl")
        .fromNow()}!`
    );

  setFieldSpacing("bottom");

  return await interaction.editReply({
    embeds: [getResultEmbed(interaction, type)],
  });
};

module.exports = {
  name: "draw",
  description: drawHelpMessage,
  execute: (interaction) => main(interaction),
};
