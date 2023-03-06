const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const { getClient } = require("../../database/getClient");
const {
  hasArgs,
  noArgsMessage,
  getRandomInteger,
  convertArgName,
  removeDiacritics,
  capitalizeFirstLetter,
} = require("../../utils");
const {
  character,
  drawHelpMessage,
  genre,
  narration,
  required_word,
  forbidden_word,
  theme,
  place,
  wordsRange,
  rate,
  rhythm,
  key,
  requiredKey,
  forbiddenKey,
  musicGenre,
  requiredInstrument,
  forbiddenInstrument,
  mood,
} = require("../../utils/commands/funUtils");

const result = [];

const drawerTypes = {
  wyzwanie_muzyczne: "music",
  wyzwanie_pisarskie: "writing",
};

const categories = [
  "temat",
  "narracja",
  "wymagane_slowo",
  "zabronione_slowo",
  "gatunek",
  "zakres_slow",
  "postac",
  "miejsce",
];

const musicCategories = [
  "tempo",
  "rytm",
  "tonacja",
  "wymagany_klawisz",
  "zakazany_klawisz",
  "gatunek",
  "wymagany_instrument",
  "zakazany_instrument",
  "nastroj",
];

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

const selectedCategories = [];

const selectedMusicCategories = [];

const setResult = (name, value, inline = true) => {
  result.push({ name: convertArgName(name), value, inline });
};

const setFieldSpacing = (direction) => {
  if (direction === "bottom")
    return result.push({ name: "\u200B", value: "\u200B" });

  return result.unshift({ name: "\u200B", value: "\u200B" });
};

const draw = () => {
  result.length = 0;
  selectedCategories.forEach((selectedCategory) => {
    switch (removeDiacritics(selectedCategory.toLowerCase())) {
      case "temat":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(theme[getRandomInteger(0, theme.length)])
        );
        break;
      case "narracja":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            narration[getRandomInteger(0, narration.length)]
          )
        );
        break;
      case "wymagane_slowo":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            required_word[getRandomInteger(0, required_word.length)]
          )
        );
        break;
      case "zabronione_slowo":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            forbidden_word[getRandomInteger(0, forbidden_word.length)]
          )
        );
        break;
      case "gatunek":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(genre[getRandomInteger(0, genre.length)])
        );
        break;
      case "zakres_slow":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            wordsRange[getRandomInteger(0, wordsRange.length)]
          )
        );
        break;
      case "postac":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            character[getRandomInteger(0, character.length)]
          )
        );
        break;
      case "miejsce":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(place[getRandomInteger(0, place.length)])
        );
        break;
      default:
        break;
    }
  });

  selectedCategories.length = 0;
};

const drawMusic = () => {
  result.length = 0;
  selectedMusicCategories.forEach((selectedCategory) => {
    switch (removeDiacritics(selectedCategory.toLowerCase())) {
      case "tempo":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(rate[getRandomInteger(0, rate.length)])
        );
        break;
      case "rytm":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(rhythm[getRandomInteger(0, rhythm.length)])
        );
        break;
      case "tonacja":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(key[getRandomInteger(0, key.length)])
        );
        break;
      case "wymagany_klawisz":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            requiredKey[getRandomInteger(0, requiredKey.length)]
          )
        );
        break;
      case "zakazany_klawisz":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            forbiddenKey[getRandomInteger(0, forbiddenKey.length)]
          )
        );
        break;
      case "gatunek":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            musicGenre[getRandomInteger(0, musicGenre.length)]
          )
        );
        break;
      case "wymagany_instrument":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            requiredInstrument[getRandomInteger(0, requiredInstrument.length)]
          )
        );
        break;
      case "zakazany_instrument":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(
            forbiddenInstrument[getRandomInteger(0, forbiddenKey.length)]
          )
        );
        break;
      case "nastroj":
        setResult(
          selectedCategory,
          capitalizeFirstLetter(mood[getRandomInteger(0, mood.length)])
        );
        break;
      default:
        break;
    }
  });

  selectedMusicCategories.length = 0;
};

const saveDrawer = async (interaction, type) => {
  const client = await getClient();
  const drawer = await client.query(
    `SELECT user_id FROM drawers WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}' AND type = '${drawerTypes[type]}';`
  );

  if (drawer.rows.length === 0)
    await client.query(
      `INSERT INTO drawers(draw_at, user_id, guild_id, type) VALUES (current_timestamp, '${interaction.user.id}', '${interaction.guildId}', '${drawerTypes[type]}');`
    );
  else
    await client.query(
      `UPDATE drawers SET draw_at = current_timestamp WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}' AND type = '${drawerTypes[type]}';`
    );
};

const isNotAbleToDraw = async (interaction, type) => {
  const client = await getClient();
  const drawer = await client.query(
    `SELECT * FROM drawers WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}' AND type = '${drawerTypes[type]}';`
  );

  if (drawer.rows.length === 0) return false;

  return (
    moment(drawer.rows.at(0).draw_at).isAfter(
      moment().startOf("isoweek").set({ s: 0, m: 0, h: 0 })
    ) &&
    moment(drawer.rows.at(0).draw_at).isBefore(
      moment().startOf("isoweek").add(6, "days").set({ s: 23, m: 59, h: 59 })
    )
  );
};

const getResultEmbed = (interaction, type) =>
  new EmbedBuilder()
    .setColor(embedColors[result.length])
    .setTitle("Wylosowano dla Ciebie:")
    .addFields(result)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL({ dynamic: true }),
    })
    .setFooter({
      text:
        type === "wyzwanie_muzyczne"
          ? "Połamania klawiszy"
          : "Połamania pióra!",
    });

const setSelectedCategories = (interaction, type) => {
  if (type === "wyzwanie_muzyczne")
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

  setSelectedCategories(interaction, type);
  if (!hasArgs(selectedCategories) && !hasArgs(selectedMusicCategories))
    return await interaction.editReply(noArgsMessage);

  if (await isNotAbleToDraw(interaction, type))
    return interaction.editReply(
      `Ty spryciarzu... 😝 nieładnie tak oszukiwać, następne losowanie jest dopiero ${moment()
        .startOf("isoweek")
        .add(7, "days")
        .set({ s: 0, m: 0, h: 0 })
        .locale("pl")
        .fromNow()}!`
    );

  if (type === "wyzwanie_muzyczne") drawMusic();
  else draw();

  saveDrawer(interaction, type);
  setFieldSpacing("bottom");

  return await interaction.editReply({
    embeds: [getResultEmbed(interaction, type)],
  });
};

module.exports = {
  name: "losuj",
  description: drawHelpMessage,
  execute: (interaction) => main(interaction),
};
