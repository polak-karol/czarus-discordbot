const { getClient } = require("../../database/getClient");

const responses = {
  0: "Ta osoaba dostała już od Ciebie walentynkę.",
  1: "Twoja walentynka zostanie za chwilę dostarczona.",
  2: "Coś poszło nie tak... Spróbuj ponownie później, albo napisz do 4Tune 🥺",
};

const saveValentine = async (interaction) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM valentines WHERE guild_id = '${
      interaction.guildId
    }' AND author_id = '${interaction.user.id}' AND recipient_id = '${
      interaction.options.getUser("do").id
    }'`
  );

  if (parseInt(countResult.rows[0].count, 10) > 0) return 0;

  try {
    await client.query(
      `INSERT INTO valentines(message, recipient_id, author_id, guild_id) VALUES ('${interaction.options.getString(
        "wiadomosc"
      )}', '${interaction.options.getUser("do").id}', '${
        interaction.user.id
      }', '${interaction.guildId}');`
    );
  } catch (error) {
    return 2;
  }
  return 1;
};

module.exports = {
  name: "walentynka",
  execute: async (interaction) => {
    await interaction.deferReply({ ephemeral: true });
    const saveResult = await saveValentine(interaction);
    return await interaction.editReply({
      content: responses[saveResult],
      ephemeral: true,
    });
  },
};
