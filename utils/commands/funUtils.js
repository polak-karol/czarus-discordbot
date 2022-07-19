const { getClient } = require("../../database/getClient");

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
  "A skąd ja to mam wiedzieć?",
  "Phi, nie powiem.",
  "To moja słodka tajemnica.",
  "Bo jestem Czarusiem i wiem wszystko.",
  "Zapytaj się Amoriny. Ona wie wszystko.",
  "Zapytaj się Grota. On wie, że wszystko zależy od kontekstu.",
  "Zapytaj się VintageSoul. On Ci wszystko wyśpiewa.",
  "Zapytaj się SaYo. Uciekaj, no już!",
  "Zapytaj się Kapelusznika. On ma duży kapelusz.",
  "Zapytaj się Arcyprezesa.",
  "Idź z tym pytaniem do Ancymona.",
  "A kysz!",
  "Ponieważ tak uważam i nie dyskutuj!",
  "Zadajesz za dużo pytań…",
  "Chyba się najadłaś szaleju, że zadajesz mi takie pytania…",
  "Pytasz poważnie?",
  "Nie mam teraz czasu.",
  "Jestem zajęty czarowaniem, nie przeszkadzaj mi.",
  "Odejdź, nie teraz.",
  "Jesteś urocza, że pytasz, ale Ci nie powiem.",
  "Ponieważ pięknie dziś wyglądasz.",
  "Bo świetną jesteś osóbką.",
  "Dlaczego pytasz?",
  "Ponieważ wróżki są jakieś takie nawiedzone…",
  "Ponieważ Cię kocham.",
  "Amarena, amarena, cztery złote i Cię nie ma.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Bo tylko Ciebie kocham.",
  "Lubię Cię, ale teraz jestem zajęty. Mam zlecenie od 4Tune.",
];

const doesResponse = [
  "Wyciąga łentke.",
  "Nie oceniaj, bo sam zostaniesz oceniony.",
  "Jestem tak chętny, jak Grot do mówienia “r”.",
  "Jeszcze nie polubiłem nigdy osoby z Twojego... zawodu.",
  "Ślubu nie będzie.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "Sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Tyle Amareny chlejecie, że dna nie widać.",
  "Trudno powiedzieć… Może zapytaj Amoriny?",
  "Tak, tak, to wszystko zawsze zależało od kontekstu.",
  "Co mówisz?",
  "Buuuu, jem śniadanie, idź sobie.",
  "Myślę, że ślubu nie będzie.",
  "A Ty tylko pytasz i pytasz. Idź coś ze sobą zrób pożytecznego.",
  "Nie mam ochoty Ci odpowiadać.",
  "Nie wiem, ale wiem, że Cię kocham.",
  "Weź już przestań mnie zaczepiać.",
  "Ponieważ Cię kocham.",
  "Amarena, amarena, cztery złote i Cię nie ma.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Dawno, dawno temu, za górami, za lasami…",
];

const whenResponses = [
  "To wszystko zależy od kontekstu.",
  "Stań się przyjacielem, to ludzie wyrosną Ci z chodnika.",
  "Bez pośpiechu. Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Bo ja wiem? Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "Sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Nie wiem, ale wiem, że Cię kocham.",
  "Kiedyś.",
  "Zastanowię się i potem Ci powiem.",
  "Weź już przestań mnie zaczepiać.",
  "Trudno powiedzieć, ale chyba niedługo.",
  "Zaraz, daj mi się skupić.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Dawno, dawno temu, za górami, za lasami…",
];

const howResponses = [
  "Nie oceniaj, bo sam zostaniesz oceniony.",
  "Srak jak nie wiesz jak.",
  "Nie ma to jak się pogrążać.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Stań się przyjacielem, to ludzie wyrosną Ci z chodnika.",
  "Trzeba być odważnym... Jak świnka morska.",
  "Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "Weź już przestań mnie zaczepiać.",
  "Myślę, że musisz iść spać.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Na wznak. Już wiesz jak?",
  "Dobre pytanie.",
  "Jakoś na pewno.",
];

const doYouThinkResponses = [
  "Co dwie głowy to nie jedna.",
  "Ten co dużo myśli, mało robi. Rozwiązaniem jest myślenie o działaniu.",
  "Zabawne... a w ostatnim zdaniu nazwę to fraszką.",
  "Nic co ludzkie nie jest mi obce.",
  "Nic nowego, to tylko monolog Grota.",
  "Wielkie umysły myślą podobnie.",
  "Jestem tak chętny, jak Grot do mówienia “r”.",
  "Jeszcze nie polubiłem nigdy osoby z twojego... zawodu.",
  "Ludzie z głupim humorem myślą podobnie i wcale nie trzeba być inteligentnym.",
  "Nie ma gramatyki, nie ma zmartwień.",
  "Ślubu nie będzie.",
  "Głodnemu chleb na myśli.",
  "Skarbówka i tak gorsza niż żona. Choć to wszystko i tak zależy od kontekstu.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Stań się przyjacielem, to ludzie wyrosną Ci z chodnika.",
  "Trzeba być odważnym... Jak świnka morska.",
  "Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Ponieważ 100% Amareny to więcej niż jakikolwiek mocny trunek.",
  "Ancymon jest bioekologiczny?",
  "Amarenowego pojęcia nie mam.",
  "Wolę być biedny i mieć pieniądze.",
  "Sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Tyle Amareny chlejecie, że dna nie widać.",
  "Myślę, że to urocze.",
  "Myślę, że musisz iść spać.",
  "Weź już przestań mnie zaczepiać.",
  "Ponieważ Cię kocham.",
  "Amarena, amarena, cztery złote i Cię nie ma.",
  "Mówiłem Ci już, że tylko miłość cię uzdrowi?",
  "Jajco.",
  "A nic.",
  "Któż by to wiedział?",
  "Myślę, że… hmmm… myślę, że możesz zadać inne pytanie.",
  "Myślenie? A co to, jakieś danie kuchni azjatyckiej?",
];

const whoResponses = [
  "Czaruś, rzecz jasna.",
  "4Tune, mój cudowny twórca.",
  "Amorina… Ale cicho.",
  "SaYo. Jest szalona.",
  "Arcyprezes. Ale ćśśśś.",
  "VintageSoul. To ta muzyka mu mózg zlasowała.",
  "Ancymon. To jego wina, bo jest ancymonkiem.",
  "Kapelusznik. W kapeluszu trzyma duży sekret.",
  "Ameworks. Ten nasz Strażnik.",
  "Dziku. Wrr. Czemu ja Ci to powiedziałem?",
  "A bo ja wiem…",
  "Hmmm….",
  "Taki jeden gagatek.",
  "Amarena! To wszystko przez Amarenę!",
  "Nie mam amarenowego pojęcia.",
  "Zaraz Ci powiem, tylko ogarnę jeden eliksir.",
  "Przyjdź za pół godzinki, dobrze?",
  "A kogo to obchodzi?",
  "Pff, nie powiem. Nie jestem skarżypytą.",
];

const getAnswers = async (tableName, guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT answer FROM ${tableName} WHERE guild_id = '${guildId}';`
  );

  await client.end();

  return entries.rows;
};

module.exports = {
  genre,
  narration,
  theme,
  wordsRange,
  drawHelpMessage,
  whyResponses,
  doesResponse,
  whenResponses,
  howResponses,
  doYouThinkResponses,
  whoResponses,
  getAnswers,
};
