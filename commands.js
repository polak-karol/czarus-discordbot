const { SlashCommandBuilder } = require("@discordjs/builders");

const slashCommands = [
  new SlashCommandBuilder().setName("ping").setDescription("Ping pong!"),
  new SlashCommandBuilder()
    .setName("walentynka")
    .setDescription("Event walentynkowy.")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("wyslij")
        .setDescription("Wyślij walentynkę.")
        .addUserOption((option) =>
          option
            .setName("do")
            .setDescription("Osoba do której chcesz wysłać walentynkę.")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("wiadomosc")
            .setDescription("Treść walentynki")
            .setRequired(true)
        )
    ),
  new SlashCommandBuilder()
    .setName("urodziny")
    .setDescription("Urodziny")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("zapamietaj")
        .setDescription(
          "Napisz Czarkowi, kiedy masz urodziny, żeby mógł złożyć Ci życzenia."
        )
        .addNumberOption((option) =>
          option
            .setName("dzien")
            .setDescription("Dzień urodzin")
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("miesiac")
            .setDescription("Miesiąc urodzin")
            .setMinValue(1)
            .setMaxValue(12)
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("rok")
            .setDescription("Miesiąc urodzin")
            .setMinValue(new Date().getFullYear() - 150)
            .setMaxValue(new Date().getFullYear())
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("zapomnij")
        .setDescription(
          "Powiedz Czarusiowi, żeby zapomniał o Twoich urodzinach."
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("kiedy")
        .setDescription("Spytaj Czarusie kiedy są czyjeś urodziny")
        .addUserOption((option) =>
          option
            .setName("uzytkownik")
            .setDescription("Dowolny użytkownik serwera.")
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
        .setDescription("Czy chcesz wylosować wymagany zakres słów w utworze?")
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
        .setDescription("Czy chcesz wylosować miejsce rozgrywania się akcji?")
        .addChoices(
          { name: "Tak", value: "true" },
          { name: "Nie", value: "false" }
        )
    ),
].map((command) => command.toJSON());

module.exports = { slashCommands };