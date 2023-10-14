import { sendDailyBirthDayInfo } from '../jobs/birthday'
import { sendDailyHolidayInfo } from '../jobs/holiday'

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
