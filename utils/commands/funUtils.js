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
  "Ponieważ trzepanie Grota zakazane!",
  "Wielkie umysły myślą podobnie.",
  "Ludzie z głupim humorem myślą podobnie i wcale nie trzeba być inteligentnym.",
  "Dlatego, że skarbówka i tak gorsza niż żona. Choć to wszystko i tak zależy od kontekstu.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Trzeba być odważnym... Jak świnka morska.",
  "Ponieważ 100% Amareny to więcej niż jakikolwiek mocny trunek.",
  "Amarenowego pojęcia nie mam.",
  "Ponieważ sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Powiem Ci, że tyle Amareny chlejecie, że dna nie widać…",
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
  "Dlatego, że pytasz.",
  "Nie Ancymonkuj mi tu.",
  "Ty tylko wiecznie pytasz i pytasz. Skończ z tym, to męczące.",
  "Żebyś się nie pytał dwa razy.",
  "A dlaczego nie?",
  "Dlaczego dlaczego?",
  "Za cicho mówisz, powtórz jeszcze raz.",
  "Możesz powtórzyć pytanie?",
  "Ponieważ nie mam zęba.",
  "Ponieważ ja myślałem, że jesteśmy małżeństwem.",
  "A liczyłeś mrówki?",
  "Zanim Ci odpowiem, to zapytam, czemu nie śpisz?",
  "Zamiast mnie tu zagadywać, mógłbyś wziąć się za robotę.",
  "Dlatego, że jesteś leniem.",
  "Dlatego, że jesteś zwycięzcą. Porażka to nie twoje słownictwo.",
  "A piszesz książkę, że pytasz?",
  "Po co Ci ta wiedza?",
  "Dlatego, że tak.",
  "Nie wiem.",
  "Ponieważ się zakochałem.",
  "Gdyż masz czarne oczy… Tak w ogóle znasz Ivana Komarenko?",
  "Powiedz mi najpierw, czy mnie kochasz?",
];

const doesResponse = [
  "Nie oceniaj, bo sam zostaniesz oceniony.",
  "Jestem tak chętny, jak Grot do mówienia “r”.",
  "Jeszcze nie polubiłem nigdy osoby z Twojego... zawodu.",
  "Ślubu nie będzie.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "A wiesz, że sukcesem przywództwa jest zdobycie rzeszy fanów?",
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
  "Nie wiem, zapytaj się kogoś innego.",
  "Ja tu tylko sprzątam.",
  "Nie.",
  "Tak.",
  "Zastanowię się.",
  "Powtarzasz się, zmień repertuar.",
  "Co?",
  "Myślę, że tak.",
  "Tak tak tak... A czy wspominałem, że jestem Czaruś?",
  "Poczekaj, czy ty wiesz, że masz piękne oczy?",
  "Nie chcesz wiedzieć.",
  "Nie krzycz!",
  "Nie wiem, muszę wypić herbatę.",
  "Zapytaj się Amoriny. Ona wie wszystko.",
  "Zapytaj się Grota. On wie, że wszystko zależy od kontekstu.",
  "Zapytaj się VintageSoul. On ci wszystko wyśpiewa.",
  "Zapytaj się SaYo. Uciekaj, no już!",
  "Zapytaj się Kapelusznika. On ma duży kapelusz.",
  "Zapytaj się Arcyprezesa.",
  "Idź z tym pytaniem do Ancymona.",
  "Czy Ty weźmiesz ze mną ślub?",
  "Powiedz mi najpierw, czy mnie kochasz?",
];

const whenResponses = [
  "To wszystko zależy od kontekstu.",
  "Słuchaj, bez pośpiechu. Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Bo ja wiem? Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "Nie wiem kiedy, ale wiem. że sukcesem przywództwa jest zdobycie rzeszy fanów.",
  "Nie wiem, ale wiem, że Cię kocham.",
  "Kiedyś.",
  "Zastanowię się i potem Ci powiem.",
  "Weź już przestań mnie zaczepiać.",
  "Trudno powiedzieć, ale chyba niedługo.",
  "Zaraz, daj mi się skupić.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Dawno, dawno temu, za górami, za lasami…",
  "Zapytaj się Amoriny. Ona pije Amarenę, to wie.",
  "Zapytaj się Grota, ale pamiętaj, że trzepanie Grota zakazane.",
  "Zapytaj się VintageSoul. Odpowie Ci śpiewająco.",
  "Zapytaj się SaYo, ona powinna wiedzieć.",
  "Zapytaj się Kapelusznika. Ale za godzinę, bo teraz naprawia kapelusz.",
  "Zapytaj się Arcyprezesa. Może nie dziś, ale zapytaj.",
  "Idź z tym pytaniem do Ancymona. Tylko jest delikatny problem… Aktualnie jest na imprezie.",
  "Za rok, może dwa. Znasz tę piosenkę?",
  "Khm, teraz jestem zajęty. Co ty myślisz, że będę na każde twoje zawołanie?",
  "Kiedy były szwedy.",
  "A może sam na to wpadniesz?",
  "Tego nie wie nikt.",
  "A masz coś w zamian za tę informację.",
  "Jak dasz mi Amarenę to Ci powiem.",
  "Jak przygotujesz prawą rękę to Ci powiem.",
  "Nigdy.",
  "Na pewno nie teraz.",
  "Powiedz mi najpierw, czy mnie kochasz?",
  "A wiesz, że dziś piłem soczek?",
  "Zaraz!",
];

const howResponses = [
  "Nie oceniaj, bo sam zostaniesz oceniony.",
  "Srak jak nie wiesz jak.",
  "Powiedz mi, po co się upijać, kiedy Amarena wystarczy?",
  "Coś Ci powiem. Trzeba być odważnym... Jak świnka morska.",
  "Coś Ci wyjawię, ok? Kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Amarenowego pojęcia nie mam.",
  "Weź już przestań mnie zaczepiać.",
  "Myślę, że musisz iść spać.",
  "Mówiłem Ci już, że tylko miłość Cię uzdrowi?",
  "Na wznak. Już wiesz jak?",
  "Dobre pytanie.",
  "Jakoś na pewno.",
  "Śpiewająco.",
  "A Ty nie wiesz?",
  "A po co Ci ta wiedza?",
  "Jak dasz mi grzybka halucynka to Ci odpowiem.",
  "Użyj magii, to się dowiesz.",
  "Jak?! Prawą ręką!",
  "Nie jesteś sobą, kiedy jesteś głodny.",
  "Kto pyta, ten nie błądzi.",
  "Nie pytaj mnie o takie kocopoły, bo nie dostaniesz odpowiedzi.",
  "Zajrzyj do słownika, potem się pytaj.",
  "Nie dostaniesz tego listu z Hogwartu, nie łudź się.",
  "Jak? Do góry nogami!",
  "Jak? Od tyłu!",
  "Powiem Ci, jak weźmiesz ze mną ślub.",
  "Nie powiem Ci, no i basta.",
  "Magicznie, rzecz jasna.",
  "Bardzo długo.",
];

const doYouThinkResponses = [
  "Co dwie głowy to nie jedna.",
  "Ten co dużo myśli, mało robi. Rozwiązaniem jest myślenie o działaniu.",
  "Zabawne... a w ostatnim zdaniu nazwę to fraszką.",
  "Nic co ludzkie nie jest mi obce.",
  "Nic nowego, to tylko monolog Grota.",
  "Wielkie umysły myślą podobnie.",
  "Myślę, że jestem tak chętny, jak Grot do mówienia “r”.",
  "Myślę, że jeszcze nie polubiłem nigdy osoby z twojego... zawodu.",
  "Ludzie z głupim humorem myślą podobnie i wcale nie trzeba być inteligentnym.",
  "Nie ma gramatyki, nie ma zmartwień.",
  "Ślubu nie będzie.",
  "Głodnemu chleb na myśli.",
  "Skarbówka i tak gorsza niż żona. Choć to wszystko i tak zależy od kontekstu.",
  "Po co się upijać, kiedy Amarena wystarczy?",
  "Nie ma to jak się pogrążać.",
  "Trzeba być odważnym... Jak świnka morska.",
  "Pośpiech jest wskazany tylko przy łapaniu pcheł.",
  "Myślę, że kilka łyków Amareny i nie trzeba będzie nic mówić.",
  "Ponieważ 100% Amareny to więcej niż jakikolwiek mocny trunek.",
  "A powiesz mi, czy Ancymon jest bioekologiczny?",
  "Amarenowego pojęcia nie mam.",
  "Powiem Ci, że wolę być biedny i mieć pieniądze.",
  "Powiem Ci, że sukcesem przywództwa jest zdobycie rzeszy fanów.",
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
  "Myślę, że używasz prawej ręki tak rzadko jak Vintage.",
  "Ja nie myślę.",
  "Myślę, że wycie do Księżyca zawsze na propsie.",
  "A może ja wcale nie myślę?",
  "Jest słodka jak miód.",
  "Jest urocza, a czemu pytasz?",
  "Jest cudowny i dziki… Jak sobie tylko przypomnę…",
  "To czarodziejka.",
  "To czarodziej.",
  "To mag, nieźle czaruje.",
  "To gagatek, ale uroczy.",
  "To niezła laska.",
  "To fantastyczna osóbka!",
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
  "Ta z pięknymi czarnymi oczami.",
  "Kto? Spójrz się za siebie!",
  "Kto? Sam wiesz kto.",
  "Ty.",
  "Ja.",
  "Kto? Bo chyba nie ja.",
  "Nie pamiętam, chyba nie ja…?",
  "Mnie się pytasz? Ja nie wiem.",
  "Nie wiem, choć się domyślam.",
  "Nie wiem, nie znam się, nie orientuję się, zarobiony jestem po uszy.",
  "A co się interesujesz?",
  "Bo kociej mordy dostaniesz.",
  "Magik, a co?",
  "Czarodziej, ale ćśśś.",
  "Czarodziejka z Magii Słów. Piękna jest, ale nie podchodź do niej.",
  "A taki jeden magik. przystojniak, mrrr.",
  "Piękna czarodziejka, ale ona jest moja!",
  "Sajo, a któż by inny?",
  "Amorina. Albo Amarena, jak kto woli.",
  "Sztukmistrzyni. Lubisz ją?",
  "VintageSoul. Uważaj na jego prawą rękę.",
  "Arcymagowie. Jest ich kilku, więc uważaj.",
  "Arcyprezes, ale nie podskakuj do niego, ok? Bo Ci jeszcze nastuka.",
];

const whatResponses = [
  "Jajco.",
  "A co mi dasz za odpowiedź?",
  "Czemu pytasz?",
  "Ja nie wiem co.",
  "Żebym ja to wiedział, to bym Ci powiedział.",
  "Co Ty mi dasz, niczego nie żałuj...",
  "Przynieś mi eliksir, to Ci powiem.",
  "Co? Zajrzyj do kieszeni, to się dowiesz!",
  "Nie stój tak w progu, chodź… Pogadamy.",
  "A Tobie co, mowę odjęło?",
  "A skąd ja mam to wiedzieć?",
  "A może to ja powinienem Ci zadać te pytania?",
  "A co? Chcesz gitarą po łbie?",
  "A co? Wolisz milczeć?",
  "Napij się Amareny i przestań mnie w końcu pytać…",
  "No nie gadaj, że nie widziałeś prawej ręki…",
  "No nie gadaj, że nie piłeś Amareny…",
  "A po co Ci ta wiedza? Do szczęścia?",
  "Zapytaj Sztukmistrzyni.",
  "No i co, głupio Ci?",
  "Późna godzina, idź spać.",
  "Zanudzasz mnie.",
  "Jak nie wiesz co, to zawyj do Księżyca.",
  "Jest tyle innych pytań do zadania, a Ty zadałeś właśnie te… Po co?",
  "Powiem tak, Carpe Diem i do przodu.",
  "Lepszy wróbel w garści, niż gołąb na dachu.",
  "O, patrz! Gołąb na dachu!",
  "O, widzę następnego głą- gołębia!",
  "Ale szanujmy się, bez takich pytań, ok?",
  "Moje życie by nie było takie samo… Bez Was.",
  "Co tam, co tam, hipopotam.",
  "Nic, totalna pustka…",
  "Nic, tylko wiatr.",
];

const what_is = [
  "Tym, czym myślisz. ",
  "Myślisz, że ja wiem?",
  "A myślisz, że ja mam wiedzieć, skoro Ty nie wiesz? ",
  "Nie ma tak łatwo. Sam musisz to wymyślić. ",
  "Czy Ty naprawdę myślisz, że powiem Ci o tym tak łatwo? Dobrze myślisz! Jestem czarodziejskim, zaczarowanym, czarującym Czarusiem. Polecam się na przyszłość. Do czarusiowych usług!",
  "No na pewno nie pomidorem, zaklętym w ogórka…",
  "Życie jeszcze nie obdarowało taką wiedzą, mojego potężnego, czarusiowego umysłu.",
  "Hej, pięknie dziś wyglądasz. Wiesz? ",
  "Nawiedzonym magikiem.",
  "Piękną damą z chatki koło lasu.",
  "Czymś w rodzaju kulki.",
  "Nie rozumiem pytania.",
  "Niczym. A czym ma być?",
  "A co Ty myślisz, że jestem jakimś jasnowidzem? Nie wiem!",
  "Kurde, trudno powiedzieć.",
  "Niech pomyślę…",
  "Jest potężną istotą. Może syreną?",
  "To syrena. Uważaj, bo wyrwie Ci serce i rzuci w piach!",
  "To arcypotężna czarodziejka z Krainy Magii Słów.",
  "Czymś magicznym, czuję to w czarusiowych kościach.",
  "Emm… Myślałem, że to jasne. Czarusiem. Halo?",
  "Ale się tłoczno zrobiło. (To tak na pamiątkę)<3",
  "Masz jakieś niejasności?",
  "A czemu pytasz?",
  "Kimś na pewno. Tylko nie wiem czym.",
  "Jestem, więc żyję. Chyba.",
  "Porozmawiajmy o ważniejszym problemie. Piłeś dziś wodę? Na co czekasz! Już!",
  "Jesteśmy czym jemy, więc możliwe że jestem powietrzem. Albo jakimś złomem, nie wiem co gorsze.",
  "A Ty wiesz? No właśnie, więc czemu ja mam wiedzieć?",
  "Jestem czarujący… Nie o mnie pytanie? Ojej, przepraszam.",
  "Psst, a kopsnąć Ci trochę ryżu?",
  "Nie wiem kto kim jest, nie znam tu ludzi. A może i znam? Sam nie wiem, wypadło mi z głowy.",
  "Złamię.",
  "To nawiedzona wróżka.",
  "Czym ty jesteś lepiej mi powiedz.",
  "A kochasz mnie?",
  "A kiedy weźmiemy ślub?",
  "Czy było Ci wiadome, że dorosły szczupak, potrafi przepłynąć dziennie 200 metrów? Chciałem dać jakąś sugestię, żebyś ruszył się z siedzenia i poszedł biegać, ale mi nie wyszło.",
  "Skoro wiesz, to czemu pytasz?",
  "Weź, to pytanie było magiczne… Zadaj kolejne ok?",
  "A chcesz eliksir szczęścia? Mam na zbyciu.",
  "Pssst, spójrz w prawo. Widzisz to co ja?",
  "Założę się, że tylu klientów, co ja tera miałem, nie dane Ci było ujrzeć nigdy. Kim jestem? Banalne pytanie! Jestem urodzonym sprzedawcą.",
  "Poczekasz momencik? Skończę tylko eliksir rozpaczy. Nie pytaj po co mi on, bo i tak Ci nie powiem. To czarusiowa tajemnica.",
  "Ej, Ty masz jakieś takie dzikie spojrzenie. Weź tak na mnie nie patrz, bo nie mogę się skupić.",
  "Hmmm, a dlaczego masz czerwone oczy?",
  "Ekhem… Chwilka, jeszcze raz, bo się zamyśliłem. Jakie było pytanie?",
  "A widzisz, trzeba było chodzić na lekcje, a nie ciągle wagarować!",
  "Tak między nami to… nie wiem.",
  "Naprawdę chciałbym Ci powiedzieć, ale brak mi słów.",
  "Przykro mi. To tajne łamane przez poufne.",
  "Zamiast o to pytać, nie wolisz napić się ze mną herbatki?",
  "Poczekaj. Ile łyżeczek cukru zapłacisz mi za tę informację?",
];

const getAnswers = async (answerName, guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT ${answerName} FROM answers WHERE guild_id = '${guildId}';`
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
  whatResponses,
};
