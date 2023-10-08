const { SlashCommandBuilder } = require("@discordjs/builders");

const slashCommands = [
  new SlashCommandBuilder().setName("ping").setDescription("Ping pong!"),
  // new SlashCommandBuilder()
  //   .setName("walentynka")
  //   .setDescription("Event walentynkowy.")
  //   .addSubcommand((subcommand) =>
  //     subcommand
  //       .setName("wyslij")
  //       .setDescription("Wyślij walentynkę.")
  //       .addUserOption((option) =>
  //         option
  //           .setName("do")
  //           .setDescription("Osoba do której chcesz wysłać walentynkę.")
  //           .setRequired(true)
  //       )
  //       .addStringOption((option) =>
  //         option
  //           .setName("wiadomosc")
  //           .setDescription("Treść walentynki")
  //           .setRequired(true)
  //       )
  //       .addStringOption((option) =>
  //         option.setName("tytul").setDescription("Tytul walentynki")
  //       )
  //       .addStringOption((option) =>
  //         option.setName("podpis").setDescription("Podpis walentynki")
  //       )
  //   ),
  new SlashCommandBuilder()
    .setName("birthdays")
    .setNameLocalizations({
      pl: "urodziny",
    })
    .setDescription("Birthdays")
    .setDescriptionLocalizations({ pl: "Urodziny" })
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remember")
        .setNameLocalizations({ pl: "zapamiętaj" })
        .setDescription(
          "Tell Czaruś when your birthday is so that he can wish you well."
        )
        .setDescriptionLocalizations({
          pl: "Napisz Czarkowi, kiedy masz urodziny, żeby mógł złożyć Ci życzenia.",
        })
        .addNumberOption((option) =>
          option
            .setName("day")
            .setNameLocalizations({ pl: "dzień" })
            .setDescription("Day of birth.")
            .setDescriptionLocalizations({ pl: "Dzień urodzin." })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("month")
            .setNameLocalizations({ pl: "miesiąc" })
            .setDescription("Month of birth.")
            .setDescriptionLocalizations({ pl: "Miesiąc urodzin." })
            .setMinValue(1)
            .setMaxValue(12)
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("year")
            .setNameLocalizations({ pl: "rok" })
            .setDescription("Year of birth.")
            .setDescriptionLocalizations({ pl: "Rok urodzin." })
            .setMinValue(new Date().getFullYear() - 150)
            .setMaxValue(new Date().getFullYear())
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("forget")
        .setNameLocalizations({ pl: "zapomnij" })
        .setDescription("Tell Czaruś to forget your birthday.")
        .setDescriptionLocalizations({
          pl: "Powiedz Czarusiowi, żeby zapomniał o Twoich urodzinach.",
        })
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("when")
        .setNameLocalizations({ pl: "kiedy" })
        .setDescription("Ask Charles when someone's birthday is.")
        .setDescriptionLocalizations({
          pl: "Spytaj Czarusia kiedy są czyjeś urodziny.",
        })
        .addUserOption((option) =>
          option
            .setName("user")
            .setNameLocalizations({ pl: "użytkownik" })
            .setDescription("Select any user from the server.")
            .setDescriptionLocalizations({
              pl: "Wybierz dowolnego użytkownika z serwera.",
            })
            .setRequired(true)
        )
    ),
  new SlashCommandBuilder()
    .setName("kaczka")
    .setDescription("Kwa kwa! Z dedykacją dla Oliwii i Kraba."),
  new SlashCommandBuilder()
    .setName("ktowygra")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik1")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("uzytkownik2")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("wasted")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("poszukiwany")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("tobecontinued")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("snajper")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("straszny")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("rip")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("odrzuc")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("wasik")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("missionpassed")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("wiezienie")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("ogien")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("dyktator")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("spal")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("piekny")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("plaskacz")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik1")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("uzytkownik2")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("fuzja")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik1")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    )
    .addUserOption((option) =>
      option
        .setName("uzytkownik2")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("potwierdz")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera.")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("3000years")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("crush")
    .setDescription("BETA")
    .addUserOption((option) =>
      option
        .setName("uzytkownik")
        .setDescription("Dowolny użytkownik serwera")
        .setRequired(true)
    ),
  new SlashCommandBuilder()
    .setName("losuj")
    .setDescription("Wylosuj jakieś wyzwanie.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("wyzwanie_muzyczne")
        .setDescription("Losuje wybrane kategorie do wyzwania muzycznego.")
        .addStringOption((option) =>
          option
            .setName("tempo")
            .setDescription("Czy chcesz wylosować tempo?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("rytm")
            .setDescription("Czy chcesz wylosować rytm utworu?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("tonacja")
            .setDescription("Czy chcesz wylosować tonację przewodni?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("wymagany_klawisz")
            .setDescription("Czy chcesz wylosować wymagany klawisz w utworze?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("zakazany_klawisz")
            .setDescription(
              "Czy chcesz wylosować klawisz, który nie może znaleźć się w utworze?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("wymagany_instrument")
            .setDescription(
              "Czy chcesz wylosować instrument, które musi zostać użyty?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("zakazany_instrument")
            .setDescription(
              "Czy chcesz wylosować zakazany instrument do utworu?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("gatunek")
            .setDescription("Czy chcesz wylosować gatunek?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("nastroj")
            .setDescription("Czy chcesz wylosować nastrój?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("wyzwanie_pisarskie")
        .setDescription("Losuje wybrane kategorie do wyzwania pisarskiego.")
        .addStringOption((option) =>
          option
            .setName("gatunek")
            .setDescription("Czy chcesz wylosować gatunek pracy?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("narracja")
            .setDescription("Czy chcesz wylosować narrację utworu?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("temat")
            .setDescription("Czy chcesz wylosować temat przewodni?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("zakres_slow")
            .setDescription(
              "Czy chcesz wylosować wymagany zakres słów w utworze?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("wymagane_slowo")
            .setDescription(
              "Czy chcesz wylosować słowo, które musi znaleźć się w utworze?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("zabronione_slowo")
            .setDescription(
              "Czy chcesz wylosować słowo, które nie może zostać użyte w pracy?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("postac")
            .setDescription("Czy chcesz wylosować postać do utworu?")
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
        .addStringOption((option) =>
          option
            .setName("miejsce")
            .setDescription(
              "Czy chcesz wylosować miejsce rozgrywania się akcji?"
            )
            .addChoices(
              { name: "Tak", value: "true" },
              { name: "Nie", value: "false" }
            )
        )
    ),
].map((command) => command.toJSON());

module.exports = { slashCommands };
