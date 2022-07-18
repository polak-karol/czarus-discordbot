const main = async (message, args) => {
  console.log(message.author.id);
  if (message.author.id === "277901799833206785")
    return message.reply("Przepraszam, mistrzu :(");

  message.reply("Nie.");
};

module.exports = {
  name: "przepros",
  description: "Przepros",
  usage: "!przepros",
  execute: (message, args) => main(message, args),
};
