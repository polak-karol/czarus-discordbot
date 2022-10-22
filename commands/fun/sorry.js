const { getRandomInteger } = require("../../utils");

const main = async (message, args) => {
  if (message.author.id === "277901799833206785")
    return message.reply("Przepraszam, mistrzu :(");

  if (getRandomInteger(0, 2) === 1) return message.reply("Nie.");

  return message.reply("Mówię to z trudem... Przepraszam 😣");
};

module.exports = {
  name: "przepros",
  description: "Przepros",
  usage: "!przepros",
  execute: (message, args) => main(message, args),
};
