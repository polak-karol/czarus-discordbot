const fetch = require("node-fetch");

module.exports = {
  name: "3000years",
  execute: async (interaction) => {
    const body = {
      url: interaction.options.getUser("uzytkownik").avatarURL(),
    };

    try {
      const response = await fetch(`${process.env.AMETHYSTE_URL}/3000years`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${process.env.AMETHYSTE_TOKEN}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const imageBlob = await response.arrayBuffer();
      console.log("fef");
      console.log(imageBlob);
      console.log(Buffer.from(imageBlob));
      console.log(Buffer.isBuffer(Buffer.from(imageBlob)));
      console.log(Array.isArray(imageBlob.data));
      return await interaction.reply({
        files: [{ attachment: Buffer.from(imageBlob) }],
      });
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  },
};
