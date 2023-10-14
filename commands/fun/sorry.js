const { getRandomInteger } = require('../../utils')

const main = async (message, args) => {
  if (message.author.id === '277901799833206785') return message.reply('Przepraszam, mistrzu :(')

  return getRandomInteger(0, 2) === 1
    ? message.reply('Nie.')
    : message.reply('Mówię to z trudem... Przepraszam 😣')
}

module.exports = {
  name: 'przepros',
  description: 'Przepros',
  usage: '!przepros',
  execute: (message, args) => main(message, args),
}
