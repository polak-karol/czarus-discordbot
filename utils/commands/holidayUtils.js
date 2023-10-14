const moment = require('moment')

const getHoliday = async (guildId) => {
  const response = await fetch(
    `${process.env.API_URL}/holiday/${guildId}?date=${moment().format('YYYY-MM-DD')}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Bot-Authorization': `${process.env.BOT_AUTHORIZATION_TOKEN}`,
      },
    },
  )
  const responseBody = await response.json()

  return responseBody.data
}

module.exports = { getHoliday }
