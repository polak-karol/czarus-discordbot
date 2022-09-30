const cron = require("node-cron");

const sendDailyHolidayInfo = (client) => {
  cron.schedule(
    "0 45 21 * * *",
    () => {
      client.guilds.cache
        .get("733001624427036825")
        .channels.cache.get("993197778685657180")
        .send(
          "Dziś obchodzimy ***Światowy Dzień Wegetarianizmu.*** \n\nCzy mamy na sali wegetarian? Jeśli tak, zachęcam do podzielenia się opinią, co skłoniło was do niejedzenia mięsa. \n\nCzy warto być na tej “diecie”? Jakie korzyści przynosi wegetarianizm i czy ma wpływ na wasze samopoczucie?"
        );
    },
    { timezone: "Europe/Warsaw" }
  );
};

module.exports = { sendDailyHolidayInfo };
