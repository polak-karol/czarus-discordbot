const { getClient } = require("../../database/getClient");

const genre =
  "Fantasy, Sci-fi, Horror, Kryminał, Psychologiczne, Romans, Historyczne, Obyczajowe, Młodzieżowe, Przygodowe, Humor, Poezja".split(
    ", "
  );

const narration = "Pierwszoosobowa, Drugoosobowa, Trzecioosobowa".split(", ");

const theme =
  "Duch, Leśna stwora, Szaleniec w stroju klauna, Śledztwo, Przygoda w pociągu, Tajemniczy pędzel, Tajemnica prokuratora, Nieszczęśliwa miłość, Smok, Nieoczywista pobudka, Eliksir rozpaczy, Wszystko na odwrót, Krzak kawy, Słoneczniki, Latające supły, Co się tu dzieje?, Zupełny przypadek, Historia postanowiła iść inną drogą, Godzina po północy, Guzik znaleziony na ziemi, Cela, Przez szkło starego słoika,  Dwie skarpety na jednej nodze, Duch w operze, Leśna stwora, Szaleniec w stroju klauna, Śledztwo bez poszlaki, Przygoda w pociągu, Tajemniczy pędzel, Tajemnica prokuratora, Nieszczęśliwa miłość, Zielonooki smok, Nieoczywista pobudka, Eliksir rozpaczy, Wszystko na odwrót, Zupełny przypadek, Godzina po północy, Guzik znaleziony na ziemi, Przez szkło starego słoika, Wieczór z książką, Wąchanie kleju, Ciepłe piwo i resztki hawajskiej pizzy, Zabójstwo w restauracji, Babuszka w Zakładzie Ubezpieczeń Społecznych, Komunista w przedziale w pociągu, Upicie się bez alkoholu, Niespodzianka na dzień dobry, Listonosz w stroju super mana, Wyznawca księżyca w rozmowie z wyznawcą słońca, scena mrożąca krew w żyłach, romantyczne urodziny, list w butelce, za mały sweter, bliskie spotkania trzeciego stopnia, awantura u psychiatry, wiedźma na zakupach, zegarmistrz podczas wizyty u psychologa, odcięta dłoń w prezencie, deszczowa niedziela, sen z kurami w roli głównej, sen związany z niedaleką przyszłością, sen z Dodą, lunatykowanie u przyjaciółki, zatrucie grzybami, sprzątanie mieszkania przed przyjazdem teściów, gorące spojrzenie, niepoprawna romantyczka, nieszczęśliwa miłość, melancholijna sobota, zagadka nie do rozwiązania, tajemnica grobowca na obrzeżach miasta, dziwne zjawiska pogodowe, nieoczekiwany wybuch, burzliwy dzień, eliksir szczęścia, zagadkowy chłopiec, ropucha na ganku, śmiech to zdrowie, spodnie na lewą stronę, źle dobrane skarpety, kupa śmiechu, grzybki halucynki, coś małego i dziwnego, zwiędnięte kwiaty, róże od przyjaciela, pies na horyzoncie, poradnik znaleziony w lesie, niepokojące strzały z mieszkania obok, jak robić, aby się nie narobić, wynaturzony bąk, wzdęcia po obiedzie, dziwne zioło, scena jak z horroru, niepokojące wycie zza okna, jak sobie pościelisz, tak się wyśpisz, nowa szkoła, nowe wyzwania, natchnienie podczas spaceru z psem, przygoda życia, nowe rolki, kraksa na stare lata, złamany paznokieć, struś pędziwiatr, nietypowe życzenia imieninowe, niespodzianka na wycieraczce, nieplanowane wyjście z domu, historia ze zdjęcia, wspomnienia z wakacji, koń zgubił podkowę, walka bokserska, wojna na spojrzenia, znaleziona rękawiczka, bezludna wyspa, muzyka chwytająca za serce, zapach domowego obiadu, powrót po wielu latach spędzonych na wojnie, niezgodność charakterów, huczna impreza i mała wpadka, odłamki szkła, wizja przyszłości, dylematy życiowe, kłótnia o pastę do zębów, podarta kurtka zimowa, zapowiedziany koniec świata, awaria GPS-a, puste butelki na podłodze, niezapowiedziana wizyta, zgubione klucze, rozprawa za kradzież cukierków, niezręczna pomyłka, siostra zamieniona w żabę, hałasujący sąsiedzi, Nagły ból głowy, zakrapiany rejs, zwiedzanie zoo, Spóźnienie na rozmowę kwalifikacyjną, spalone frytki, zwichnięcie kostki, randka w ciemno, smród w mieszkaniu, awaria spadochronu, polowanie na orangutana, odkrycie kości dinozaurów, spacer na cmentarzu, postać ze snów, bliskie spotkania trzeciego stopnia, pieśni choroszczańskie, kołysanka dla nieznajomej, przebita opona, wycieczka do psychiatryka, pętla czasowa, podróże w czasie, zamawianie pizzy, zrzuta na paliwo, kłótnia o klimatyzację, dyskoteka dla głuchoniemych, wyciek niebezpiecznego wirusa (w Chinach), spotkanie integracyjne, piżama party, wylany atrament, zaginione pieniądze z komunii, sto złotych na chodniku, wyścigi konne, dowodzenie kurzem na podwórzu, zawód miłosny, kontuzja sportowa, rozmowa kwalifikacyjna".split(
    ", "
  );

const wordsRange = [
  "200-500",
  "500-1000",
  "1000-3000",
  "3000-5000",
  "5000-10000",
];

const required_word =
  "terrarium, banan, kot, miód, słoik, książka, czajnik, woda, dzbanek, zwierzak, puzzle, praca, mikrofon, słuchawki, miska, talerz, powieść, czajnik, mysz, zasilacz, orzeszki, folia, figurka, podręcznik, instrukcja, skarpetki, kaczka, prezent, klawiatura, lampa, ściana, gwóźdź, klamka,  pstryczek elektryczek, koc, widelec, piła, kula, lustro, woda, zapałka, cukierki, mięta, poduszka, dinozaur, klocki, samochód, kabanos, klawisz, podłoga, panel, nożyczki, długopis, linijka, cyrkiel, nóż, pistolet, łóżko, szafa, kamień, drzewo, rower, hulajnoga, internet, telefon, dom, mieszkanie, pociąg, ryba, SMS, ciężarówka, kilof, łożysko, łopata, sąd, krab, olej, pasta, maść końska, nurofen, kość, radio, majtki, czapka, ogórek, lakier hybrydowy, koc, sztuczna szczęka, broń myśliwska, smycz, przycisk, zeszyt, dziura, wybój, kształt, kolor, amarena".split(
    ", "
  );

const forbidden_word =
  "nie, tak, może, pewność, więc, ale, z, oraz, gdyby, on, ona, ono, oni, one, jest, twoje, moje, przez, ponieważ, może, jednak, nigdy, zawsze, czasami, gdyby, coraz, kiedy, kiedyś, cóż".split(
    ", "
  );

const character =
  "wkurzony detektyw, zadowolona wiedźma, niemiła czarodziejka, nieufna syrena, technik szarlatan, szalony zielarz, robotnik nekromanta, rolnik szukający żony, policjant kultysta, zboczony informatyk,  niewidomy programista,  nietechniczny architekt, barista bez smaku, bankowiec socjalistyczny, broker alkoholik, celnik narkoman, pinokio strażak, otyły dietetyk, aspołeczny dziennikarz,  farmaceuta bez wykształcenia, fotograf bez aparatu, zezowaty fryzjer, żołnierz bez beretu, grafik akrobata, kelner bez tacki, rozmarzony magazynier, kierowca bombowca, arogancka kosmetyczka,  kucharz na podwójnym gazie, Rozdrażniona księgowa, dama w białych rękawiczkach, upośledzony psychiatra, jednooki sprinter, pijany maszynista CTL, mechanik w podartej koszuli, nauczyciel, który wstał lewą nogą, naukowiec teoretyk, recepcjonistka w kapeluszu, zaczarowany jednorożec, jednooki potwór, filozof po terapii,  Zapalony gracz, Emo girl, Emo boy, Jesieniara z aparatem, Tarocistka z wadą wzroku, Malarka daltonistka, Malarz mówiący z obcym języku, Nieistniejąca postać z komiksu, Smutna postać z mangi, Nieoczywista postać z anime, Wyjątkowa postać z książki, Zagadkowa postać z filmu, Nieoczekiwana postać z serialu, Znana osobowość, Andrzej Duda, Youtuber bez dostępu do internetu,  Niemiec z Ameryki, Fullstack developer, Akwarysta, który szuka Nemo, Polityk partii nazistowskiej, Sprzątaczka z wyższym wykształceniem, Umięśniony konserwator, Inżynier ze śrubokrętem, Lekarz bez licencji, Adwokat w sportowym stroju, Bredzący pisarz, Amarenowy Poeta, Pijany marynarz, Nieudolny złodziej, Miła recepcjonistka, Jednonogi sprinter, Ślepy strzelec, Pan maruda, Niszczyciel dobrej zabawy, Fanatyk wędkarstwa, Fan metalu oraz anime, Cosplayer w stroju Adama, Kewin sam w domu, Anonimowy hipopotam, Wilkołak po dropsach, Wskrzeszony A. H., Czarujący czaruś, Franz Meyer, Bełkoczący bard, Poważny Rzezimieszek, Cukiernik po chorobie, Wesoły wąsacz, Bogdan Boner, Upadły anioł, Jednoręki bandyta".split(
    ", "
  );

const place =
  "Osiedlowa apteka, Sklepik z pamiątkami, Lewiatan, Las na obrzeżach miasta, Oczko wodne, Mieszkanie przyjaciela, Domek na drzewie, Osiedlowy kiosk, Posterunek policji, Kościół, Kosmos, Baza na biegunie, Stara winda, Kapliczka, Ocean, Stara chatka, Urząd miasta, Zakład Ubezpieczeń Społecznych, Sklep spożywczy, Uniwersytet Łódzki, Szkoła podstawowa, Klatka schodowa, Zakład mechaniczny, Skup złomu, Wysypisko śmieci, Pole minowe, Domek nad jeziorem, Sad owocowy, Przyczepa kempingowa, Pod łóżkiem, Pod drzewem, Park, Zamek Windsor, Pałac Buckingham, Cmentarz, Zagroda dla zwierząt".split(
    ", "
  );

const drawHelpMessage =
  "Wylosuj temat, narracje, słowo wymagane, słowo zabronione, gatunek, liczbę słów oraz postać do własnego wyzwania pisarskiego.";

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
  required_word,
  forbidden_word,
  character,
  place,
  drawHelpMessage,
  getAnswers,
};
