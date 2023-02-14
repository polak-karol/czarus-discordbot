const {
  ChannelType,
  ThreadAutoArchiveDuration,
  EmbedBuilder,
} = require("discord.js");
const { getClient } = require("../../database/getClient");

const responses = {
  0: "Ta osoba dostała już od Ciebie walentynkę.",
  1: "Twoja walentynka zostanie za chwilę dostarczona.",
  2: "Coś poszło nie tak... Spróbuj ponownie później, albo napisz do 4Tune 🥺",
};

const getEmbed = (interaction) =>
  new EmbedBuilder()
    .setDescription(interaction.options.getString("wiadomosc"))
    .setColor("#EA2027")
    .setTitle(interaction.options.getString("tytul"))
    .setAuthor({
      name: interaction.options.getUser("do").username,
      iconURL: interaction.options.getUser("do").avatarURL({ dynamic: true }),
    })
    .setFooter({ text: interaction.options.getString("podpis") });

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
    return 1;
  }
  return 1;
};

const sendValentine = async (interaction, client) => {
  const channel = await client.guilds.cache
    .get("972581289972596756")
    .channels.cache.get("1074612430979731496");

  const valentineRecipient = interaction.options.getUser("do");

  let privateThread = channel.threads.cache.find(
    (x) => x.name === valentineRecipient.id
  );

  if (!privateThread) {
    privateThread = await channel.threads.create({
      name: valentineRecipient.id,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
      type: ChannelType.PrivateThread,
      reason: "Walentynka",
    });
    await privateThread.members.add(valentineRecipient.id);
    await privateThread.send("POCZTA WALENTYNKOWA");
  }

  await privateThread.send(`||<@${valentineRecipient.id}>||`);
  await privateThread.send({ embeds: [getEmbed(interaction)] });
};

module.exports = {
  name: "walentynka",
  execute: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: true });

    const saveResult = await saveValentine(interaction);

    if (saveResult === 1) await sendValentine(interaction, client);

    return await interaction.editReply({
      content: responses[saveResult],
      ephemeral: true,
    });
  },
};
