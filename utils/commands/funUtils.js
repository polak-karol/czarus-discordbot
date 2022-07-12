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

module.exports = { genre, narration, theme, wordsRange, drawHelpMessage };
