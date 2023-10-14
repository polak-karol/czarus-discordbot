import fetch from 'node-fetch'
import { errorCommandMessage } from '../../utils/config'

export default {
  name: 'kaczka',
  execute: async (interaction) => {
    await interaction.deferReply()

    try {
      const response = await fetch(`${process.env.RANDOM_DUCK_URL}/random`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
        },
      })
      const responseBody = await response.json()
      return await interaction.editReply({
        files: [{ attachment: responseBody.url }],
      })
    } catch (error) {
      return await interaction.editReply(errorCommandMessage)
    }
  },
}
