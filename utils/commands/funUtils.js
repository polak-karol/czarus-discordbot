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
  "Zapytaj się VintageSoul. On ci wszystko wyśpiewa.",
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
  "Jesteś urocza, że pytasz, ale ci nie powiem.",
  "Ponieważ pięknie dziś wyglądasz.",
  "Bo świetną jesteś osóbką.",
  "Dlaczego pytasz?",
  "Ponieważ wróżki są jakieś takie nawiedzone…",
  "Ponieważ Cię kocham.",
  "Amarena, amarena, cztery złote i Cię nie ma.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Bo tylko Ciebie kocham.",
];

const doesResponse = [
  "Wyciąga łentke.",
  "Nie oceniaj, bo sam zostaniesz oceniony.",
  "Jestem tak chętna, jak Grot do mówienia “r”.",
  "Jeszcze nie polubiłam nigdy osoby z Twojego... zawodu.",
  "Ślubu nie będzie.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "Sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Tyle Amareny chlejecie że dna nie widać.",
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
  "Mówiłem Ci już, że tylko miłość cię uzdrowi?",
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
];

const doYouThinkResponses = [
  "Co dwie głowy to nie jedna.",
  "Ten co dużo myśli, mało robi. Rozwiązaniem jest myślenie o działaniu.",
  "Zabawne... a w ostatnim zdaniu nazwę to fraszką.",
  "Nic co ludzkie nie jest mi obce.",
  "Nic nowego, to tylko monolog Grota.",
  "Wielkie umysły myślą podobnie.",
  "Jestem tak chętna, jak Grot do mówienia “r”.",
  "Jeszcze nie polubiłam nigdy osoby z twojego... zawodu.",
  "Ludzie z głupim humorem myślą podobnie i wcale nie trzeba być inteligentnym.",
  "Nie ma gramatyki, nie ma zmartwień.",
  "Ślubu nie będzie.",
  "Głodnemu chleb na myśli.",
  "Skarbówka i tak gorsza niż żona. Choć to wszystko i tak zależy od kontekstu.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Stań się przyjacielem, to ludzie wyrosną ci z chodnika.",
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
];

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
};
