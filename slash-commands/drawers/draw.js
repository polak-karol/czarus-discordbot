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
} = require("../../utils/commands/funUtils");

const result = [];

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

const selectedCategories = [];

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
  console.log(selectedCategories, "feefe");
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
};

const saveDrawer = async (interaction) => {
  const client = await getClient();
  const drawer = await client.query(
    `SELECT user_id FROM drawers WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}'`
  );

  if (drawer.rows.length === 0)
    await client.query(
      `INSERT INTO drawers(draw_at, user_id, guild_id) VALUES (current_timestamp, '${interaction.user.id}', '${interaction.guildId}');`
    );
  else
    await client.query(
      `UPDATE drawers SET draw_at = current_timestamp WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}';`
    );
};

const isNotAbleToDraw = async (interaction) => {
  const client = await getClient();
  const drawer = await client.query(
    `SELECT * FROM drawers WHERE guild_id = '${interaction.guildId}' AND user_id = '${interaction.user.id}'`
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

const getResultEmbed = (interaction) =>
  new EmbedBuilder()
    .setTitle("Wylosowano dla Ciebie:")
    .addFields(result)
    .setAuthor({
      name: interaction.user.username,
      iconURL: interaction.user.avatarURL({ dynamic: true }),
    })
    .setFooter({ text: "Połamania pióra!" });

const setSelectedCategories = (interaction) => {
  categories.forEach((category) => {
    const selectedCategory = interaction.options.getString(category);
    if (selectedCategory === "true") selectedCategories.push(category);
  });
};

const main = async (interaction, args) => {
  setSelectedCategories(interaction);
  if (!hasArgs(selectedCategories))
    return await interaction.reply(noArgsMessage);
  // return console.log("interaction");

  // if (await isNotAbleToDraw(interaction))
  //   return interaction.reply(
  //     `Ty spryciarzu... 😝 nieładnie tak oszukiwać, następne losowanie jest dopiero ${moment()
  //       .startOf("isoweek")
  //       .add(7, "days")
  //       .set({ s: 0, m: 0, h: 0 })
  //       .locale("pl")
  //       .fromNow()}!`
  //   );

  draw();
  // if (!result.length) return interaction.reply("Podano błędne argumenty.");

  // saveDrawer(interaction);
  setFieldSpacing("bottom");

  return await interaction.reply({ embeds: [getResultEmbed(interaction)] });
};

module.exports = {
  name: "losuj",
  description: drawHelpMessage,
  execute: (interaction, args) => main(interaction, args),
};
