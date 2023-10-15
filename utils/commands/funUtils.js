export const getAnswers = async (answerName, guildId) => {
  const response = await fetch(`${process.env.API_URL}/answer/list/${guildId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'Bot-Authorization': `${process.env.BOT_AUTHORIZATION_TOKEN}`,
    },
  })
  const responseBody = await response.json()

  return responseBody.data[answerName]
}
