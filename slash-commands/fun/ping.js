module.exports = {
  name: "ping",
  execute: async (message, args) => {
    console.log(message);
    await message.reply("Pong!");
  },
};
