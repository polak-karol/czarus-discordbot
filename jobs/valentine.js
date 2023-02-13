const {
  ChannelType,
  ThreadAutoArchiveDuration,
  EmbedBuilder,
} = require("discord.js");
const cron = require("node-cron");

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
};

const sendValentineToEveryone = async (client) => {
  cron.schedule(
    "0 0 7 * * *",
    async () => {
      const guild = await client.guilds.cache.get("733001624427036825");
      const guildMembers = await guild.members.fetch();
      const channel = await guild.channels.cache.get("733001624930484305");

      guildMembers.forEach((guildMember) =>
        sendValentineToGuildMember(guildMember, channel)
      );
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendValentineToEveryone };
