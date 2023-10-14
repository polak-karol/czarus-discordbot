import fetch from 'node-fetch'
import { errorCommandMessage } from '../../utils/config'

export default {
  name: 'rip',
  execute: async (interaction) => {
    await interaction.deferReply()
    const body = {
      url: interaction.options.getUser('uzytkownik').avatarURL(),
    }

    try {
      const response = await fetch(`${process.env.AMETHYSTE_URL}/rip`, {
        method: 'POST',
        headers: {
          authorization: `Bearer ${process.env.AMETHYSTE_TOKEN}`,
          'content-type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      const imageBlob = await response.arrayBuffer()
      return await interaction.editReply({
        files: [{ attachment: Buffer.from(imageBlob) }],
      })
    } catch (error) {
      return await interaction.editReply(errorCommandMessage)
    }
  },
}
