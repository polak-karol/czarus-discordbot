const {
  ChannelType,
  ThreadAutoArchiveDuration,
  EmbedBuilder,
} = require("discord.js");
const cron = require("node-cron");
const { getClient } = require("../database/getClient");

const getEmbed = (guildMember) =>
  new EmbedBuilder()
    .setDescription(
      "Dwie róże w wazonie są stołu ozdobą, \nA list jest rozmową między Magią Słów a Tobą. \nWięc dla dalszej miłej naszej znajomości, \nWysyłamy Ci w Walentynki ten symbol miłości. \nTen liścik z całusem dziś do Ciebie leci, \nHumor Ci poprawi, a sercu żar roznieci. \nPomyśl dzisiaj o Magii Słów tak słodko i miło, \nŻeby w środku zimy cieplej się zrobiło!"
    )
    .setColor("#EA2027")
    .setTitle("Poczta Walentynkowa")
    .setAuthor({
      name: guildMember.user.username,
      iconURL: guildMember.user.avatarURL({ dynamic: true }),
    })
    .setFooter({ text: "Administracja Magii Słów" });

const sendValentineToGuildMember = async (guildMember, channel) => {
  let privateThread = channel.threads.cache.find(
    (x) => x.name === guildMember.user.id
  );

  if (!privateThread) {
    privateThread = await channel.threads.create({
      name: guildMember.user.id,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
      type: ChannelType.PrivateThread,
      reason: "Walentynka",
    });
    await privateThread.members.add(guildMember.user.id);
  }

  await privateThread.send(`||<@${guildMember.user.id}>||`);
  await privateThread.send({ embeds: [getEmbed(guildMember)] });

  return true;
};

const saveAllToDatabase = async (guildMember) => {
  const client = await getClient();
  await client.query(
    `INSERT INTO valentinesall(recipient_id, guild_id) VALUES ('${guildMember.user.id}', '972581289972596756');`
  );
};

const sendValentineToEveryone = async (client) => {
  cron.schedule(
    "0 55 17 * * *",
    async () => {
      const guild = await client.guilds.cache.get("972581289972596756");
      const guildMembers = await guild.members.fetch();
      const channel = await guild.channels.cache.get("1074612430979731496");

      guildMembers.forEach(async (guildMember) => {
        const result = await sendValentineToGuildMember(guildMember, channel);
        if (result) await saveAllToDatabase(guildMember);
      });
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendValentineToEveryone };
