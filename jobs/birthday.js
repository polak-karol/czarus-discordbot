const cron = require('node-cron')
const _ = require('lodash')
const { getRandomInteger, getBirthdaysConfig } = require('../utils')
const { getBirthday, wishesPlural, wishesSingular } = require('../utils/jobs/birthdayUtils')

const sendDailyBirthDayInfo = async (client) => {
  const birthdaysConfig = await getBirthdaysConfig()

  if (!_.isEmpty(birthdaysConfig))
    birthdaysConfig.forEach((birthdaysConfigItem) =>
      cron.schedule(
        '0 0 8 * * *',
        async () => {
          const birthdays = await getBirthday(birthdaysConfigItem.guildId)

          if (birthdays.length > 0) {
            const text = `<@&986163091089809428> Urodziny dzisiaj ${
              birthdays.length > 1 ? 'obchodzą' : 'obchodzi'
            }:\n${birthdays.map((birthday) => `<@${birthday.userId}>`).join(', ')}. \n\n${
              birthdays.length > 1
                ? wishesPlural[getRandomInteger(0, wishesPlural.length)]
                : wishesSingular[getRandomInteger(0, wishesSingular.length)]
            }`

            client.guilds.cache
              .get(birthdaysConfigItem.guildId)
              .channels.cache.get(birthdaysConfigItem.birthdaysAnnouncementChannelId)
              .send(text)
          }
        },
        { timezone: 'Europe/Warsaw' },
      ),
    )
}

module.exports = { sendDailyBirthDayInfo }
