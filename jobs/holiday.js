const cron = require("node-cron");

const sendDailyHolidayInfo = (client) => {
  cron.schedule(
    "0 0 6 * * *",
    () => {
      client.guilds.cache
        .get("972581289972596756")
        .channels.cache.get("1001790827091198033")
        .send(
          "Dziś obchodzimy ***Światowy Dzień Wegetarianizmu.*** \n\nCzy mamy na sali wegetarian? Jeśli tak, zachęcam do podzielenia się opinią, co skłoniło was do niejedzenia mięsa. \n\nCzy warto być na tej “diecie”? Jakie korzyści przynosi wegetarianizm i czy ma wpływ na wasze samopoczucie?"
        );
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
