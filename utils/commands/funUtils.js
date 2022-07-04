const genre =
  "powieść, nowela, opowiadanie, epos, baśń, pamiętniki, oda, pieśń, fraszka, hymn, tren, elegia, sonet, tragedia, komedia, farsa, tragifarsa, opera.".split(
    ", "
  );

const narration = "pierwszoosobowa, trzecioosobowa".split(", ");

const drawHelpMessage =
  "Wylosuj temat, narracje, słowo wymagane, słowo zabronione, gatunek, liczbę słów oraz postać do własnego wyzwania pisarskiego.";

module.exports = { genre, narration, drawHelpMessage };
