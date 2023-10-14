import axios from axios

axios.defaults.baseURL = process.env.API_URL
axios.defaults.withCredentials = false

const defaultHeaders = {
  headers: { 'Bot-Authorization': `${process.env.BOT_AUTHORIZATION_TOKEN}` },
}

const buildFormData = (object) => {
  const formData = new FormData()
  Object.keys(object).every((key) => {
    if (object[key]?.toLocaleString().includes('FileList')) {
      for (let i = 0; i < object[key].length; i++) formData.append(`${key}[]`, object[key][i])
      return true
    }

    formData.append(key, object[key])
    return true
  })
  return formData
}

const responseBody = (response) => response.data

const requests = {
  get: (url, options = defaultHeaders) => axios.get(url, options).then(responseBody),
  post: (url, body, options = defaultHeaders) =>
    axios.post(url, options.formData ? buildFormData(body) : body, options).then(responseBody),
  put: (url, body, options = defaultHeaders) =>
    axios.put(url, options.formData ? buildFormData(body) : body, options).then(responseBody),
  delete: (url) => axios.delete(url).then(responseBody),
}

const Birthdays = {
  getBirthday: (guildId, userId) => requests.get(`/birthday/${guildId}?user_id=${userId}`),
  updateBirthday: (guildId, body) => requests.put(`/birthday/${guildId}`, body),
  deleteBirthday: (guildId, userId) => requests.delete(`/birthday/${guildId}?user_id=${userId}`),
  getBirthdaysConfig: (guildId) => requests.get(`/birthday-config/${guildId}`),
  updateBirthdayConfig: (guildId, body) => requests.put(`/birthday-config/${guildId}`, body),
}

const Answers = {
  getAnswers: (guildId) => requests.get(`/answer/list/${guildId}`),
  updateAnswers: (guildId, body) => requests.put(`/answer/${guildId}`, body),
  getAnswerConfig: (guildId) => requests.get(`/answer-config/${guildId}`),
  updateAnswerConfig: (guildId, body) => requests.put(`/answer-config/${guildId}`, body),
}

const Holidays = {
  getHoliday: (guildId, date) => requests.get(`/holiday/${guildId}?date=${date}`),
  updateHolidays: (guildId, body) => requests.put(`/holiday/${guildId}`, body),
  getHolidays: (guildId, dates) =>
    requests.get(`/holiday/list/${guildId}?startDate=${dates.startDate}&endDate=${dates.endDate}`),
  getHolidayConfig: (guildId) => requests.get(`/holiday-config/${guildId}`),
  updateHolidayConfig: (guildId, body) => requests.put(`/holiday-config/${guildId}`, body),
}

const Draws = {
  getDrawConfigs: (guildId) => requests.get(`/draw-config/${guildId}`),
  updateDrawConfigs: (guildId, body) => requests.put(`/draw-config/${guildId}`, body),
}

const Drawers = {
  updateDrawer: (guildId, body) => requests.put(`/drawer/${guildId}`, body),
}

const User = {
  sendDiscordCode: (body) => requests.post('/discord-login', body),
  getCurrentUser: () => requests.get('/user'),
}

const Guild = {
  getGuildChannels: (guildId) => requests.get(`/guild-channels/${guildId}`),
}

const GuildSettings = {
  updateSettings: (guildId, body) => requests.put(`/guild-settings/${guildId}`, body),
  getSettings: (guildId) => requests.get(`/guild-settings/${guildId}`),
}

export const agent = {
  Birthdays,
  Draws,
  Drawers,
}

