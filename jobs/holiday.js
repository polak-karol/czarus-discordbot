import cron from 'node-cron'
import _ from 'lodash'
import { getHoliday } from '../utils/commands/holidayUtils'
import { getHolidaysConfig } from '../utils/index'

const sendDailyHolidayInfo = async (client) => {
  const holidaysConfig = await getHolidaysConfig()

  if (!_.isEmpty(holidaysConfig))
    holidaysConfig.forEach((holidaysConfigItem) => {
      cron.schedule(
        '0 0 6 * * *',
        async () => {
          const holiday = await getHoliday(holidaysConfigItem.guildId)
          client.guilds.cache
            .get(holidaysConfigItem.guildId)
            .channels.cache.get(holidaysConfigItem.holidayAnnouncementChannelId)
            .send(holiday.message)
        },
        { timezone: 'Europe/Warsaw' },
      )
    })
}

export default sendDailyHolidayInfo
