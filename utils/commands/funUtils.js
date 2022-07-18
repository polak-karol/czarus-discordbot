const genre =
  "Fantasy, Sci-fi, Horror, Kryminał, Psychologiczne, Romans, Historyczne, Obyczajowe, Młodzieżowe, Przygodowe, Humor, Poezja"
    .toLowerCase()
    .split(", ");

const narration = "Pierwszoosobowa, Drugoosobowa, Trzecioosobowa"
  .toLowerCase()
  .split(", ");

const theme =
  "Duch , Leśna stwora, Szaleniec w stroju klauna, Śledztwo, Przygoda w pociągu, Tajemniczy pędzel, Tajemnica prokuratora, Nieszczęśliwa miłość, Smok, Nieoczywista pobudka, Eliksir rozpaczy, Wszystko na odwrót, Krzak kawy, Słoneczniki, Latające supły, Co się tu dzieje?, Zupełny przypadek, Historia postanowiła iść inną drogą, Godzina po północy, Guzik znaleziony na ziemi, Cela, Przez szkło starego słoika"
    .toLowerCase()
    .split(", ");

const wordsRange = [
  "200-500",
  "500-1000",
  "1000-3000",
  "3000-5000",
  "5000-10000",
];

const drawHelpMessage =
  "Wylosuj temat, narracje, słowo wymagane, słowo zabronione, gatunek, liczbę słów oraz postać do własnego wyzwania pisarskiego.";

const whyResponses = [
  "To wszystko zależy od kontekstu.",
  "Trzepanie Grota zakazane.",
  "Wielkie umysły myślą podobnie.",
  "Ludzie z głupim humorem myślą podobnie i wcale nie trzeba być inteligentnym.",
  "Skarbówka i tak gorsza niż żona. Choć to wszystko i tak zależy od kontekstu.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Trzeba być odważnym... Jak świnka morska.",
  "Ponieważ 100% Amareny to więcej niż jakikolwiek mocny trunek.",
  "Amarenowego pojęcia nie mam.",
  "Sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Tyle Amareny chlejecie, że dna nie widać.",
];

module.exports = {
  genre,
  narration,
  theme,
  wordsRange,
  drawHelpMessage,
  whyResponses,
};
