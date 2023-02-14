const {
  ChannelType,
  ThreadAutoArchiveDuration,
  EmbedBuilder,
} = require("discord.js");
const { getClient } = require("../database/getClient");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

const getEmbed = () =>
  new EmbedBuilder()
    .setDescription(
      "Dwie róże w wazonie są stołu ozdobą, \nA list jest rozmową między Magią Słów a Tobą. \nWięc dla dalszej miłej naszej znajomości, \nWysyłamy Ci w Walentynki ten symbol miłości. \nTen liścik z całusem dziś do Ciebie leci, \nHumor Ci poprawi, a sercu żar roznieci. \nPomyśl dzisiaj o Magii Słów tak słodko i miło, \nŻeby w środku zimy cieplej się zrobiło!"
    )
    .setColor("#EA2027")
    .setTitle("Poczta Walentynkowa")
    .setFooter({ text: "Administracja Magii Słów" });

const sendValentineToGuildMember = async (userId, channel) => {
  let privateThread = channel.threads.cache.find((x) => x.name === userId);

  if (!privateThread) {
    privateThread = await channel.threads.create({
      name: userId,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
      type: ChannelType.PrivateThread,
      reason: "Walentynka",
    });
    await privateThread.members.add(userId);
  }

  await privateThread.send(`||<@${userId}>||`);
  await privateThread.send({ embeds: [getEmbed()] });

  return true;
};

const saveAllToDatabase = async (userId) => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT COUNT(guild_id) FROM valentinesall WHERE guild_id = '972581289972596756' AND recipient_id = '${userId}';`
  );
  if (parseInt(countResult.rows[0].count, 10) > 0) return false;
  await client.query(
    `INSERT INTO valentinesall(recipient_id, guild_id) VALUES ('${userId}', '972581289972596756');`
  );
  return true;
};

const getAll = async () => {
  const client = await getClient();
  const countResult = await client.query(
    `SELECT recipient_id FROM valentinesall WHERE guild_id = '972581289972596756';`
  );

  return countResult;
};

const sendValentineToEveryone = async (client) => {
  return;
  const guild = await client.guilds.cache.get("972581289972596756");
  const guildMembers = await guild.members.fetch();
  const channel = await guild.channels.cache.get("1074612430979731496");
  const values = await getAll();
  const userWithValentinesIds = values.rows.map(
    ({ recipient_id }) => recipient_id
  );
  const userIds = Array.from(guildMembers).map(([id]) => id);
  const userWithNeeds = [];

  userIds.forEach((userId) => {
    if (userWithValentinesIds.includes(userId)) return;
    return userWithNeeds.push(userId);
  });

  userWithNeeds.forEach(async (userId) => {
    const result = await saveAllToDatabase(userId);
    if (result) await sendValentineToGuildMember(userId, channel);
  });
};

module.exports = { sendValentineToEveryone };
