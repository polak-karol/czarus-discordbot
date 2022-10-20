const { getClient } = require("../../database/getClient");

const getBirthday = async (guildId) => {
  const client = await getClient();

  const entries = await client.query(
    `SELECT * FROM birthdays WHERE EXTRACT(DAY FROM date) = EXTRACT(DAY FROM current_date) AND EXTRACT(MONTH FROM date) = EXTRACT(MONTH FROM current_date) AND guild_id = '${guildId}';`
  );

  await client.end();

  return entries.rows;
};

const wishesSingular = [
  "Życzenia już Ci na pewno składali. \nTwarz Twoja była uśmiechnięta. \nAle jest jeszcze kilka osób, które o Tobie pamiętają. \nOne właśnie Tobie życzą wiele szczęścia i słodyczy, wiele wspomnień, miłych wrażeń i spełnienia wszystkich marzeń! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "W każdej chwili, zawsze, wszędzie, \nNiech Ci w Życiu dobrze będzie.\nNiech Cię dobry los obdarzy… \nWszystkim, o czym tylko \nPomyślisz. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Życzę Tobie w święto twe, \nBy los uśmiechał się, \nAby zdrówko dopisało, \nZa bardzo nie figlowało, \nSzczęście niechaj sprzyja, \nSmutek Cię omija, \nMiłość w sercu trwa, \nNiech nadzieje w sobie ma, \nTego właśnie życzymy Ci, \nJasnych i pogodnych dni… \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Uśmiechu w każdej sekundzie, \nradości w każdej minucie, \nprzyjaźni w każdej godzinie, \nszczęścia każdego dnia. \nMIŁOŚCI przez całe życie.!!! \n\nWszystkiego naj naj naj. \nSzczęścia, zdrowia, pomyślności, \nCzerp z życia same radości! \nNiech los Ci zawsze sprzyja, \nA co złe niech Cię omija. \n\nDużo słodkości, szczęścia w miłości \nSamych luksusów, milion całusów. \nNiech odejdą precz gorycze \nZ głębi serca Tobie życzymy. \n\nO czym myślisz, o czym marzysz \nNiech Ci w życiu się przydarzy \nNajszczersze życzenia, marzeń spełnienia… \n\nRadości bez końca \ndni pełnych słońca, \nuśmiechu od ucha do ucha!, \n\nśmiechu do bólu brzucha. \nszczęśliwych chwil, których nie policzysz \ni wszystkiego, co sobie życzysz! \n100 lat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Żyj tak, aby każdy kolejny dzień był niesamowity i wyjątkowy. \nWypełniaj każdą chwilę tak, aby potem wspominać ją z radością. \nCzerp energię ze słońca, \nkapiącego deszczu i uśmiechu innych. \nSzukaj w sobie siły, entuzjazmu i namiętności. \nŻyj najpiękniej jak umiesz. \nPo swojemu. \nSpełniaj się. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Życzę Ci: \nZdrowia - bo to najważniejsze, \nMiłości - bo to najpiękniejsze, \nPrawdziwych przyjaciół - bo to najcenniejsze \nDobrego humoru - bo to lekarstwo na wszystko \nSamych pięknych dni i spełnienia najskrytszych marzeń. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin składamy Ci moc życzeń: uśmiechu, zdrowia, radości, mnóstwa prezentów i gości, przyjaźni wielkich i małych, wielu przygód niebywałych i uśmiechu wesołego i wszystkiego, wszystkiego najlepszego! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Aby wszystkie fajne dni w żółwim tempie upływały, by co dzień uśmiechał się do Ciebie świat cały, by nigdy nie było porannej pobudki i wiał wiatr co rozwiewa smutki. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Uważnych oczu, które dostrzegą sprawy życia codziennego, takich uszu, które wyłowią wszelkie przemilczenia, takich rąk, które będą zawsze chętne do pomocy, mądrych słów wypowiedzianych we właściwym momencie, kochającego serca, któremu pozwolisz poprowadzić się przez życie, aby tam, gdzie Ty, była miłość. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dużo zdrówka, szczęścia i radości każdego dnia pełnego miłości.\nWielkiego świata poznania, w lotto milionów wygrania. \nTego z serca Ci życzymy i hucznie Twe Urodziny obchodzimy!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin składamy Ci moc życzeń: uśmiechu, zdrowia, radości, mnóstwa prezentów i gości, przyjaźni wielkich i małych, wielu przygód niebywałych i uśmiechu wesołego i wszystkiego, wszystkiego najlepszego!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzień Urodzin się już zbliża, więc życzenia Tobie ślemy. \nAby wszystko się spełniło, o czym marzysz o czym śnisz. \nBy pogodnie mijały sny, z głębi serca życzymy Ci. \nDużo szczęścia i radości, sto lat życia mało złości. \nDni spokoju pełnych wygód, \nDużo słońca wielu przygód. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzisiaj, w urodzin Twoich dniu, radości życzymy Ci, \nby dzień ten całkiem innym był od wszystkich innych dni. \nZaś JUTRO niech Ci w darze da spełnienie wszystkich snów, coś śnił w dniach urodzin swych, w marzeniach i bez słów. \nA to najważniejsze z życzeń mych: \nNiechaj Twe przyszłe dni oszczędzą Tobie smutku i łez i szczęście dadzą Ci! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Długo czekaliśmy owej godziny, aż wreszcie nadeszły Twoje Urodziny. \nWięc chcemy przed Tobą serce otworzyć i najlepsze życzenia Ci złożyć. \nŻyj długo w szczęściu i radości, nigdy nie zaznaj przykrości. \nI tylko samych pogodnych dni, na urodziny życzymy Ci. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin składamy Ci moc życzeń: uśmiechu, zdrowia, radości, mnóstwa prezentów i gości, przyjaźni wielkich i małych, wielu przygód niebywałych i uśmiechu wesołego i wszystkiego, wszystkiego najlepszego!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Jest w roku taki dzień, w którym smutki idą w cień, więc z okazji tego dnia posłuchaj czego Ci życzymy my: dużo zdrowia i radości, szczęścia w życiu i miłości, moc najpiękniejszych wrażeń i spełnienia wszystkich marzeń. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Każdego roku o tej samej porze każdy Ci życzy, co tylko może. Ja korzystając z tej sposobności, życzę Ci szczęścia, dużo radości. To, czego pragniesz, by się spełniło, A to, co kochasz, by Twoim było!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Kwiatów nie dam, mimo szczerych chęci. Lecz słowa, które zostaną w pamięci, życzę szczęścia, dużo radości i długiej szczęśliwej przyszłości. Niech los Tobie z oczu łez nie wyciśnie, niechaj się wszystko wiedzie pomyślnie. Wszystko co piękne i wymarzone, w dniu Twych urodzin niech będzie spełnione.\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Szczęście jest ulotne... \nPojawia się, błyśnie i gaśnie. \nŻyczymy Ci, aby zaświeciło dla Ciebie \ni pozostało na zawsze. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dużo zdrowia i miłości, \nmoc uśmiechu i słodkości, \nmało smutku, trudów, łez, \nniech się spełni to, co chcesz! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dla Ciebie wszystkie cuda tego świata... \nDla Ciebie ciepło słonecznego lata \nDla Ciebie gwiazdki, co błyszczą na niebie \nDla Ciebie nutki w ptaszków śpiewie \nDla Ciebie kwiatki kolorowe \nI marzenia deserowe... \nDla Ciebie wszystko co zapragnie dusza \nBo jesteś Aniołkiem, który wciąż do radości nas zmusza! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Hmm... jakie mamy złożyć Ci życzenia \nby warte były Twego westchnienia. \nSukcesów w życiu, ciepła w miłości, \ndużo uśmiechu, wiele radości. \nNiech ten wyjątkowy w roku dzień \nodsunie na zawsze Twe troski w cień. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Radości w każdej sekundzie, \nuśmiechu w każdej minucie, \npogody w każdej godzinie, \nszczęścia przez całe życie. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Niech Ci słonko ciepło gra, \nniech Twój uśmiech długo trwa, \nnie trać swej wesołej minki, \nbo dziś Twoje urodzinki! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Niech ten radosny dzień \nna zawsze Twe troski odsunie w cień \ni niech się śmieje do Ciebie świat, \nblaskiem szczęśliwych i długich lat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Takie to szczere, proste życzenia \nCi ofiaruję w dniu Twego urodzenia: \nWiele uśmiechów, a mało żałości, \nDługich lat życia w szczęśliwości, \nDobrego zdrowia i pomyślności, \nJak najmniej smutków, dużo radości, \nDużo przygód, morza wrażeń, \nMoc słodyczy, nic goryczy \nTego Tobie serwer życzy! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzień Urodzin się już zbliża, \nWięc życzenia Tobie ślemy. \nAby wszystko się spełniło, \nO czym marzysz o czym śnisz. \nGdy pogodne mijały sny, \nZ głębi serca życzymy Ci. \nDużo szczęścia i radości, \nDużo słońca wielu przygód. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dobrego zdrowia, \nPieniędzy mrowia. \nCiągłej radości, \nSzczęścia w miłości. \nPomysłów wielu, \nDojścia do celu. \nRekordów bicia  \ni sto lat życia! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Sto buziaków, życzeń tysiąc, \nwszystkie szczere możemy przysiąc! \nWysyłamy do Ciebie z tej przyczyny, \nże dziś Twoje urodziny. \nNiech Ci zawsze szczęście sprzyja, \npech z daleka Cię omija. \nŻyj nam w zdrowiu aż sto lat, \nniech Cię kocha cały świat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Przyjmij nasze najserdeczniejsze życzenia. \nNiech wszystkie Twoje plany realizują się szybko i sprawnie. \na każdy dzień przynosi radość i satysfakcję z osiągniętych celów \nNiech spełniają się wszystkie Twoje życzenia, \nniech dopisuje Ci zdrowie, \na przyjaciele zawsze służą radą i ramieniem, \nna którym można się wesprzeć. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dziś są Twoje urodziny, \nnie miej więc poczucia winy. \nBaw się, harcuj, pij do woli, \ni używaj swej swawoli. \nWszystko o czym dzisiaj marzysz, \nniech się w końcu Ci przydarzy. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzień radosny, dzień jedyny - \ndziś są Twoje urodziny. \nZ serca składamy Ci życzenia: \ndużo szczęścia, powodzenia! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z serca płyną te życzenia \nW datę Twego urodzenia \nZdrowia, szczęścia, pomyślności, \nSto lat życia, moc radości! \nZdrowie wiecznie niech Ci służy, \nUśmiech stale miej na twarzy \nNiech stale miej na twarzy, \nNiech się spełni, o czym zamarzysz! \nNiech Ci towarzyszy zgoda \nWieczna tak jak Twa uroda. \n\nWszystkiego najlepszego! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin życzymy Ci, \naby jedynymi łzami, które \npojawią się w Twoich oczach \nbyły kryształowe łzy szczęścia, \naby radosnego uśmiechu na Twej \ntwarzy nie zakryły ciężkie chmury \nsmutku, aby płatki róż wyścielały \ndrogę Twego przeznaczenia, \na szczęście, zdrowie, radość i \nmiłość były przeznaczeniem Twych dni. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Poszybować przez życie jak ptak \nniezależny, wolny, szczęśliwy... \nPoczuć prawdziwy życia smak... \nwszystkie kolory... \njasne i ciemne odcienie... \nMieć odwagę by wzbić się wysoko... \nprzekroczyć sztywne granice... \ni nie bać się spełniać swych marzeń... \ntego w dniu Twych urodzin Ci życzymy!! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Tyle wiedzy, doświadczenia, \nMłody rzadko to docenia. \nTyle miejsc, tyle wrażeń, \nI spełnionych Twoich marzeń. \nAle to nie koniec przecież, \nJesteś teraz w wieku kwiecie. \nBądź więc sobą wciąż, niezmiennie, \nI uśmiechaj się codziennie! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Młody, stary – bez znaczenia, \nCzas jest zawsze na marzenia, \nSpełniać je można w każdej chwili, \nBo to Ci życie najlepiej umili! \nWięc rób to, na co masz ochotę, \nObejdź świat na piechotę, \nTańcz, maluj, głośno śpiewaj, \nZłych dni wcale już nie miewaj! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Życzymy Ci, aby marzenia które skrywasz na dnie Twojego serca, doczekały się spełnienia. \nKorzystając z okazji Twojego święta przesyłamy Ci również garść nadziei i wiary, \naby dały Ci one siłę do pokonywania trudności jakie pojawiają się w codziennym życiu. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Jest w roku taki dzień, \nW którym smutki idą w cień, \nWięc z okazji tego dnia \nPosłuchaj co Ci życzymy my: \nDużo zdrowia i radości, \nSzczęścia w życiu i miłości, \nMoc najpiękniejszych wrażeń \nI spełnienia wszystkich marzeń. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Radości w każdej sekundzie, uśmiechu w każdej minucie, pogody w każdej godzinie, szczęścia przez całe życie. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dziś są Twoje urodziny. \nChoć się razem nie widzimy, to przesyłamy Ci życzenia: \nNiech się spełnią Twe marzenia! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Każdego roku o tej samej porze, każdy Ci życzy co tylko może, my korzystając z tej sposobności, życzymy Ci szczęścia i wiele radości. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Niech ten radosny dzień na zawsze Twe troski odsunie w cień i niech się śmieje do Ciebie świat, blaskiem szczęśliwych i długich lat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Urodziny dzień radosny, \nPełen kwiatów zapach wiosny. \nDziś chcemy złożyć Ci życzenia, \nSzczęścia, zdrowia, powodzenia. \nNiech Ci słońce jasno świeci, \nI w radości dzień przeleci. \nNiech odejdą smutki troski, \nBy nastąpił dzień radości. \nTe życzenia choć z daleka, \nPłyną niby wielka rzeka. \nI choć skromnie ułożone, \nSą dla Ciebie przeznaczone. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "To nie gwiazdka,, to nie święta \nAle toniesz dziś w prezentach \nPrzynosimy podarunki \nZnajdą się tam także trunki \nI nieważne, które to urodziny \nLat Ci wcale nie liczymy \nŻyczyć chcemy uśmiechu szerokiego \nI oczywiście wszystkiego najlepszego! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
];

const wishesPlural = [
  "Życzenia już Wam na pewno składali. \nTwarz Wasza była uśmiechnięta. \nAle jest jeszcze kilka osób, które o Was pamiętają. \nOne właśnie Wam życzą wiele szczęścia i słodyczy, wiele wspomnień, miłych wrażeń i spełnienia wszystkich marzeń! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "W każdej chwili, zawsze, wszędzie, \nNiech Wam w Życiu dobrze będzie.\nNiech Wam dobry los obdarzy… \nWszystkim, o czym tylko \nPomyśliscie. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Życzę Wam w święto wasze, \nBy los uśmiechał się, \nAby zdrówko dopisało, \nZa bardzo nie figlowało, \nSzczęście niechaj sprzyja, \nSmutek Was omija, \nMiłość w sercu trwa, \nNiech nadzieje w sobie ma, \nTego właśnie życzymy Wam, \nJasnych i pogodnych dni… \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Uśmiechu w każdej sekundzie, \nradości w każdej minucie, \nprzyjaźni w każdej godzinie, \nszczęścia każdego dnia. \nMIŁOŚCI przez całe życie.!!! \n\nWszystkiego naj naj naj. \nSzczęścia, zdrowia, pomyślności, \nCzerpcie z życia same radości! \nNiech los Wam zawsze sprzyja, \nA co złe niech Was omija. \n\nDużo słodkości, szczęścia w miłości \nSamych luksusów, milion całusów. \nNiech odejdą precz gorycze \nZ głębi serca Wam życzymy. \n\nO czym myślicie, o czym marzycie \nNiech Wam w życiu się przydarzy \nNajszczersze życzenia, marzeń spełnienia… \n\nRadości bez końca \ndni pełnych słońca, \nuśmiechu od ucha do ucha!, \n\nśmiechu do bólu brzucha. \nszczęśliwych chwil, których nie policzycie \ni wszystkiego, co sobie życzycie! \n100 lat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Żyjcie tak, aby każdy kolejny dzień był niesamowity i wyjątkowy. \nWypełniajcie każdą chwilę tak, aby potem wspominać ją z radością. \nCzerpcie energię ze słońca, \nkapiącego deszczu i uśmiechu innych. \nSzukajcie w sobie siły, entuzjazmu i namiętności. \nŻyjcie najpiękniej jak umiecie. \nPo swojemu. \nSpełniajcie się. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Życzę Wam: \nZdrowia - bo to najważniejsze, \nMiłości - bo to najpiękniejsze, \nPrawdziwych przyjaciół - bo to najcenniejsze \nDobrego humoru - bo to lekarstwo na wszystko \nSamych pięknych dni i spełnienia najskrytszych marzeń. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin składamy Wam moc życzeń: uśmiechu, zdrowia, radości, mnóstwa prezentów i gości, przyjaźni wielkich i małych, wielu przygód niebywałych i uśmiechu wesołego i wszystkiego, wszystkiego najlepszego! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Aby wszystkie fajne dni w żółwim tempie upływały, by co dzień uśmiechał się do Was świat cały, by nigdy nie było porannej pobudki i wiał wiatr co rozwiewa smutki. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Uważnych oczu, które dostrzegą sprawy życia codziennego, takich uszu, które wyłowią wszelkie przemilczenia, takich rąk, które będą zawsze chętne do pomocy, mądrych słów wypowiedzianych we właściwym momencie, kochającego serca, któremu pozwolicie poprowadzić się przez życie, aby tam, gdzie Wy, była miłość. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dużo zdrówka, szczęścia i radości każdego dnia pełnego miłości.\nWielkiego świata poznania, w lotto milionów wygrania. \nTego z serca Wam życzymy i hucznie Wasze Urodziny obchodzimy!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin składamy Wam moc życzeń: uśmiechu, zdrowia, radości, mnóstwa prezentów i gości, przyjaźni wielkich i małych, wielu przygód niebywałych i uśmiechu wesołego i wszystkiego, wszystkiego najlepszego!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzień Urodzin się już zbliża, więc życzenia Wam ślemy. \nAby wszystko się spełniło, o czym marzycie o czym śnicie. \nBy pogodnie mijały sny, z głębi serca życzymy Wam. \nDużo szczęścia i radości, sto lat życia mało złości. \nDni spokoju pełnych wygód, \nDużo słońca wielu przygód. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzisiaj, w urodzin Waszych dniu, radości życzymy Wam, \nby dzień ten całkiem innym był od wszystkich innych dni. \nZaś JUTRO niech Wam w darze da spełnienie wszystkich snów, coś śniliście w dniach urodzin waszych, w marzeniach i bez słów. \nA to najważniejsze z życzeń mych: \nNiechaj Wasze przyszłe dni oszczędzą Wam smutku i łez i szczęście dadzą Wam! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Długo czekaliśmy owej godziny, aż wreszcie nadeszły Wasze urodziny. \nWięc chcemy przed Wami serce otworzyć i najlepsze życzenia Wam złożyć. \nŻyjcie długo w szczęściu i radości, nigdy nie zaznajcie przykrości. \nI tylko samych pogodnych dni, na urodziny życzymy Wam. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin składamy Wam moc życzeń: uśmiechu, zdrowia, radości, mnóstwa prezentów i gości, przyjaźni wielkich i małych, wielu przygód niebywałych i uśmiechu wesołego i wszystkiego, wszystkiego najlepszego!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Jest w roku taki dzień, w którym smutki idą w cień, więc z okazji tego dnia posłuchajcie czego Wam życzymy my: dużo zdrowia i radości, szczęścia w życiu i miłości, moc najpiękniejszych wrażeń i spełnienia wszystkich marzeń. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Każdego roku o tej samej porze każdy Wam życzy, co tylko może. My korzystając z tej sposobności, życzę Wam szczęścia, dużo radości. To, czego pragniecie, by się spełniło, A to, co kochacie, by Waszym było!\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Kwiatów nie dam, mimo szczerych chęci. Lecz słowa, które zostaną w pamięci, życzę szczęścia, dużo radości i długiej szczęśliwej przyszłości. Niech los Wam z oczu łez nie wyciśnie, niechaj się wszystko wiedzie pomyślnie. Wszystko co piękne i wymarzone, w dniu Waszych urodzin niech będzie spełnione.\n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Szczęście jest ulotne... \nPojawia się, błyśnie i gaśnie. \nŻyczymy Wam, aby zaświeciło dla Was \ni pozostało na zawsze. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dużo zdrowia i miłości, \nmoc uśmiechu i słodkości, \nmało smutku, trudów, łez, \nniech się spełni to, co checie! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dla Was wszystkie cuda tego świata... \nDla Was ciepło słonecznego lata \nDla Was gwiazdki, co błyszczą na niebie \nDla Was nutki w ptaszków śpiewie \nDla Was kwiatki kolorowe \nI marzenia deserowe... \nDla Was wszystko co zapragnie dusza \nBo jestecie Aniołkami, które wciąż do radości nas zmuszają! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Hmm... jakie mamy złożyć Wam życzenia \nby warte były Wasze westchnienia. \nSukcesów w życiu, ciepła w miłości, \ndużo uśmiechu, wiele radości. \nNiech ten wyjątkowy w roku dzień \nodsunie na zawsze Wasze troski w cień. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Radości w każdej sekundzie, \nuśmiechu w każdej minucie, \npogody w każdej godzinie, \nszczęścia przez całe życie. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Niech Wam słonko ciepło gra, \nniech Wasz uśmiech długo trwa, \nnie traćcie swej wesołej minki, \nbo dziś Wasze urodzinki! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Niech ten radosny dzień \nna zawsze Wasze troski odsunie w cień \ni niech się śmieje do Was świat, \nblaskiem szczęśliwych i długich lat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Takie to szczere, proste życzenia \nCi ofiaruję w dniu Twego urodzenia: \nWiele uśmiechów, a mało żałości, \nDługich lat życia w szczęśliwości, \nDobrego zdrowia i pomyślności, \nJak najmniej smutków, dużo radości, \nDużo przygód, morza wrażeń, \nMoc słodyczy, nic goryczy \nTego Tobie serwer życzy! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzień Urodzin się już zbliża, \nWięc życzenia Wam ślemy. \nAby wszystko się spełniło, \nO czym marzycie o czym śnicie. \nGdy pogodne mijały sny, \nZ głębi serca życzymy Wam. \nDużo szczęścia i radości, \nDużo słońca wielu przygód. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dobrego zdrowia, \nPieniędzy mrowia. \nCiągłej radości, \nSzczęścia w miłości. \nPomysłów wielu, \nDojścia do celu. \nRekordów bicia  \ni sto lat życia! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Sto buziaków, życzeń tysiąc, \nwszystkie szczere możemy przysiąc! \nWysyłamy do Was z tej przyczyny, \nże dziś Wasze urodziny. \nNiech Wam zawsze szczęście sprzyja, \npech z daleka Was omija. \nŻyjcie nam w zdrowiu aż sto lat, \nniech Was kocha cały świat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Przyjmijcie nasze najserdeczniejsze życzenia. \nNiech wszystkie Wasze plany realizują się szybko i sprawnie. \na każdy dzień przynosi radość i satysfakcję z osiągniętych celów \nNiech spełniają się wszystkie Wasze życzenia, \nniech dopisuje Wam zdrowie, \na przyjaciele zawsze służą radą i ramieniem, \nna którym można się wesprzeć. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dziś są Wasze urodziny, \nnie miejcie więc poczucia winy. \nBawcie się, harcujcie, pijcie do woli, \ni używajcie swej swawoli. \nWszystko o czym dzisiaj marzycie, \nniech się w końcu Wam przydarzy. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dzień radosny, dzień jedyny - \ndziś są Wasze urodziny. \nZ serca składamy Wam życzenia: \ndużo szczęścia, powodzenia! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z serca płyną te życzenia \nW datę Waszych urodzenia \nZdrowia, szczęścia, pomyślności, \nSto lat życia, moc radości! \nZdrowie wiecznie niech Wam służy, \nUśmiech stale miejcie na twarzy \nNiech stale miejcie na twarzy, \nNiech się spełni, o czym marzycie! \nNiech Wam towarzyszy zgoda \nWieczna tak jak Wasza uroda. \n\nWszystkiego najlepszego! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Z okazji urodzin życzymy Wam, \naby jedynymi łzami, które \npojawią się w Waszych oczach \nbyły kryształowe łzy szczęścia, \naby radosnego uśmiechu na Waszej \ntwarzy nie zakryły ciężkie chmury \nsmutku, aby płatki róż wyścielały \ndrogę Waszego przeznaczenia, \na szczęście, zdrowie, radość i \nmiłość były przeznaczeniem Waszych dni. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Poszybować przez życie jak ptak \nniezależny, wolny, szczęśliwy... \nPoczuć prawdziwy życia smak... \nwszystkie kolory... \njasne i ciemne odcienie... \nMiejcie odwagę by wzbić się wysoko... \nprzekroczyć sztywne granice... \ni nie bać się spełniać swych marzeń... \ntego w dniu Waszych urodzin Wam życzymy!! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Tyle wiedzy, doświadczenia, \nMłody rzadko to docenia. \nTyle miejsc, tyle wrażeń, \nI spełnionych Waszych marzeń. \nAle to nie koniec przecież, \nJesteście teraz w wieku kwiecie. \nBądźcie więc sobą wciąż, niezmiennie, \nI uśmiechajcie się codziennie! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Młody, stary – bez znaczenia, \nCzas jest zawsze na marzenia, \nSpełniać je można w każdej chwili, \nBo to Wasze życie najlepiej umili! \nWięc róbcie to, na co macie ochotę, \nObejdźcie świat na piechotę, \nTańczcie, malujcie, głośno śpiewajcie, \nZłych dni wcale już nie miewajcie! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Życzymy Wam, aby marzenia które skrywacie na dnie Waszego serca, doczekały się spełnienia. \nKorzystając z okazji Waszego święta przesyłamy Wam również garść nadziei i wiary, \naby dały Wam one siłę do pokonywania trudności jakie pojawiają się w codziennym życiu. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Jest w roku taki dzień, \nW którym smutki idą w cień, \nWięc z okazji tego dnia \nPosłuchajcie co Wam życzymy my: \nDużo zdrowia i radości, \nSzczęścia w życiu i miłości, \nMoc najpiękniejszych wrażeń \nI spełnienia wszystkich marzeń. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Radości w każdej sekundzie, uśmiechu w każdej minucie, pogody w każdej godzinie, szczęścia przez całe życie. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Dziś są Wasze urodziny. \nChoć się razem nie widzimy, to przesyłamy Wam życzenia: \nNiech się spełnią Wasze marzenia! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Każdego roku o tej samej porze, każdy Wam życzy co tylko może, my korzystając z tej sposobności, życzymy Wam szczęścia i wiele radości. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Niech ten radosny dzień na zawsze Wasze troski odsunie w cień i niech się śmieje do Was świat, blaskiem szczęśliwych i długich lat! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "Urodziny dzień radosny, \nPełen kwiatów zapach wiosny. \nDziś chcemy złożyć Wam życzenia, \nSzczęścia, zdrowia, powodzenia. \nNiech Wam słońce jasno świeci, \nI w radości dzień przeleci. \nNiech odejdą smutki troski, \nBy nastąpił dzień radości. \nTe życzenia choć z daleka, \nPłyną niby wielka rzeka. \nI choć skromnie ułożone, \nSą dla Was przeznaczone. \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
  "To nie gwiazdka, to nie święta \nAle toniecie dziś w prezentach \nPrzynosimy podarunki \nZnajdą się tam także trunki \nI nieważne, które to urodziny \nLat Wam wcale nie liczymy \nŻyczyć chcemy uśmiechu szerokiego \nI oczywiście wszystkiego najlepszego! \n\n~ życzą Arcymagowie i Strażnicy Magii Słów",
];

module.exports = { getBirthday, wishesSingular, wishesPlural };
