import sendDailyBirthDayInfo from '../../jobs/birthday.js'
import sendDailyHolidayInfo from '../../jobs/holiday.js'

export default {
  name: 'ready',
  once: true,
  async execute(client) {
    sendDailyHolidayInfo(client)
    sendDailyBirthDayInfo(client)
    client.user.setActivity('starożytne księgi', { type: 'WATCHING' })
    console.log('Bot is online')
  },
}
