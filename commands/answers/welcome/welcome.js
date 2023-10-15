const main = async (message, args) => {
  return message.reply('No witaj.')
}

export default {
  name: 'czesc',
  description: 'Powitaj Czarka',
  usage: '!czesc',
  execute: (message, args) => main(message, args),
}
