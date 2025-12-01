import React from 'react'

export const trainingModules = [
  {
    id: 'wstep',
    title: 'Wstęp: Witaj w Świecie Kreatywności! ✨',
    duration: '10 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold text-purple-800">Witaj, młody odkrywco!</h3>
        <p>
          Trzymasz w rękach przewodnik, który jest czymś więcej niż tylko książką. To mapa skarbów, która poprowadzi Cię przez fascynujący, kolorowy i pełen możliwości świat internetu. Być może marzysz o tym, by dzielić się swoimi pasjami z innymi, pokazywać swoje rysunki, opowiadać o ulubionych grach, przeprowadzać eksperymenty naukowe albo po prostu rozśmieszać ludzi. To wspaniałe! Każdy pomysł, który rodzi się w Twojej głowie, jest jak unikalna gwiazda na niebie – nie ma drugiej takiej samej. Ten kurs pomoże Ci sprawić, by Twoja gwiazda zabłysła jasno, ale w sposób bezpieczny i mądry.
        </p>

        <h4 className="text-xl font-bold text-purple-700 mt-6">🌟 Dlaczego twoje pomysły są wyjątkowe?</h4>
        <p>
          Zastanówmy się przez chwilę, dlaczego Twoje pomysły są tak wyjątkowe. Żyjesz w niesamowitych czasach, w których masz dostęp do wiedzy i narzędzi, o jakich Twoi rodzice czy dziadkowie mogli tylko marzyć. Twoje spojrzenie na świat jest świeże, pełne energii i nieograniczone przez „dorosłe" myślenie, że „czegoś się nie da". To właśnie ta dziecięca ciekawość i odwaga w zadawaniu pytań sprawiają, że Twoje historie, rysunki czy filmy mogą być tak inspirujące dla innych.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 my-6">
          <h5 className="font-bold text-blue-800 mb-2">Historia Zosi (10 lat)</h5>
          <p className="italic">
            Zosia uwielbia chodzić z tatą na spacery do lasu. Pewnego dnia zauważyła, że w różnych porach roku spotykają różne gatunki ptaków. Pomyślała: "A gdybym nagrała wszystkie ptaki, które widzę i stworzyła ich atlas dla innych dzieci?" Z pomocą taty założyła kanał na YouTube Kids, gdzie co tydzień pokazuje nowego ptaka, opowiada o nim ciekawostki i uczy jego głosu. Po trzech miesiącach jej kanał obserwuje 500 dzieci z całej Polski! Zwykły pomysł podczas spaceru zamienił się w pasjonujący projekt edukacyjny.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 my-6">
          <h5 className="font-bold text-green-800 mb-2">Historia Kuby (12 lat)</h5>
          <p className="italic">
            Kuba jest nieśmiały i ma trudności z mówieniem przed ludźmi. Ale za kamerą czuje się swobodnie! Uwielbia budować skomplikowane konstrukcje z klocków LEGO. Postanowił nagrywać timelapse'y (przyśpieszone filmy) swoich budowli z muzyką w tle. Nie musi mówić – jego ręce mówią za niego. Jego hipnotyzujące filmy pokazujące, jak w 60 sekund powstaje zamek lub statek kosmiczny, stały się hitem na TikToku rodziców. Kuba odkrył, że można być twórcą na swój własny, unikalny sposób.
          </p>
        </div>

        <p className="font-bold text-center text-lg text-purple-900 my-4">
          Pamiętaj: Nikt inny nie ma dokładnie takich samych doświadczeń, myśli i uczuć jak Ty. Twoja perspektywa jest Twoją supermocą.
        </p>

        <h4 className="text-xl font-bold text-purple-700 mt-6">🎯 Co to znaczy być „młodym influencerem"</h4>
        <p>
          W tym przewodniku często będziemy używać słowa „influencer". Ale co ono tak naprawdę znaczy? Wiele osób myśli, że to ktoś sławny, kto ma miliony obserwujących i reklamuje różne produkty. To tylko mały fragment całej prawdy.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 my-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h5 className="font-bold text-green-600 mb-3">✅ Prawdziwa definicja:</h5>
            <ul className="space-y-2">
              <li>🎨 <strong>Pasjonat:</strong> Ktoś, kto kocha to, co robi</li>
              <li>🌱 <strong>Inspirator:</strong> Motywuje innych</li>
              <li>👥 <strong>Budowniczy społeczności:</strong> Tworzy przyjazne grono</li>
              <li>📚 <strong>Nauczyciel:</strong> Przekazuje wiedzę</li>
              <li>😄 <strong>Entertainer:</strong> Umie rozbawić</li>
              <li>🤝 <strong>Przyjaciel:</strong> Buduje relacje</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h5 className="font-bold text-red-600 mb-3">❌ NIE chodzi o:</h5>
            <ul className="space-y-2">
              <li>Liczbę lajków i obserwujących</li>
              <li>Zarabianie dużych pieniędzy</li>
              <li>Bycie sławnym</li>
              <li>Posiadanie drogiego sprzętu</li>
              <li>Udawanie kogoś, kim nie jesteś</li>
            </ul>
          </div>
        </div>

        <h4 className="text-xl font-bold text-purple-700 mt-6">🛡️ Zasada #1: Bezpieczeństwo</h4>
        <div className="bg-red-50 p-6 rounded-xl border border-red-200">
          <p className="font-bold text-red-800 text-center text-lg mb-4">
            Zasada #1 brzmi: TWOJE BEZPIECZEŃSTWO I DOBROSTAN SĄ NAJWAŻNIEJSZE.
          </p>
          <p>
            Internet jest jak wielkie miasto – pełne wspaniałych miejsc, ale też ciemnych zaułków. Dlatego nigdy nie będziemy chodzić po tym mieście samotnie. Zawsze będziemy trzymać się za rękę z zaufanymi dorosłymi.
          </p>
        </div>

        <h5 className="font-bold text-gray-800 mt-4">Złote Zasady Bezpieczeństwa:</h5>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>🔒 Prywatność:</strong> Nigdy nie ujawniaj nazwiska, szkoły, adresu.</li>
          <li><strong>👨‍👩‍👧 Rodzice w pętli:</strong> Rodzic czyta komentarze i zatwierdza filmy.</li>
          <li><strong>🚫 Granice:</strong> Nie pokazuj innych dzieci bez zgody, unikaj tematów dla dorosłych.</li>
          <li><strong>⚠️ Zagrożenia:</strong> Jeśli ktoś prosi o spotkanie lub zdjęcia - to ZAGROŻENIE.</li>
        </ul>

        <h4 className="text-xl font-bold text-purple-700 mt-6">👨‍👩‍👧‍👦 Rola rodziców</h4>
        <p>
          Twoi rodzice to Twoi sojusznicy! Są Twoimi producentami, ochroniarzami, doradcami i największymi fanami. Wspólne tworzenie treści to klucz do sukcesu i bezpieczeństwa.
        </p>
      </div>
    )
  },
  {
    id: 'czesc-1',
    title: 'Część I: Twoje Bezpieczne Cyfrowe Miejsce 🏰',
    duration: '15 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          Wyobraź sobie, że chcesz zbudować wspaniały domek na drzewie. Potrzebujesz bezpiecznego drzewa. Podobnie jest w internecie. Zanim zaczniesz tworzyć, musisz znaleźć bezpieczne miejsce.
        </p>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 1: Dlaczego „Zwykłe" Media Nie Są Dla Ciebie? ⚖️</h3>
        <p>
          TikTok, Instagram czy „dorosły" YouTube wyglądają kusząco, ale mają ograniczenia wiekowe (zazwyczaj 13 lub 16 lat). To nie wymysł dorosłych, by zepsuć Ci zabawę - to ochrona.
        </p>

        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500 my-4">
          <h4 className="font-bold text-yellow-800 mb-2">🇪🇺 RODO i Twoje Dane</h4>
          <p>
            RODO to cyfrowy superbohater chroniący Twoje dane. Platformy zarabiają na zbieraniu informacji o Tobie, by wyświetlać reklamy. RODO chroni dzieci przed tym mechanizmem. W Polsce granica wieku zgody na przetwarzanie danych to 16 lat.
          </p>
        </div>

        <h4 className="font-bold text-gray-800 mt-4">🧠 Pułapki psychologiczne:</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Infinite Scroll:</strong> Nigdy nie kończąca się lista filmów.</li>
          <li><strong>FOMO:</strong> Strach, że coś przegapisz.</li>
          <li><strong>Dopaminowa pętla:</strong> Uzależnienie od lajków.</li>
        </ul>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 2: Twoje Bezpieczne Playgroundy 🎠</h3>
        
        <div className="grid gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-red-500">
            <h4 className="text-xl font-bold text-red-600 mb-2">🎬 YouTube Kids</h4>
            <p className="mb-4">Twoja bezpieczna biblioteka filmowa. Filtrowane treści, brak komentarzy, kontrola rodzicielska.</p>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Tryb "Tylko zatwierdzone treści" - najbezpieczniejszy</li>
              <li>• Timer limitujący czas</li>
              <li>• Podział na grupy wiekowe</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-blue-500">
            <h4 className="text-xl font-bold text-blue-600 mb-2">💬 Messenger Kids</h4>
            <p className="mb-4">Bezpieczny komunikator dla dzieci 6-12 lat. Rodzic kontroluje listę kontaktów.</p>
            <ul className="text-sm space-y-1 text-gray-600">
              <li>• Zero reklam i zakupów</li>
              <li>• Rozmowy wideo z filtrami</li>
              <li>• Rodzic widzi wiadomości</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-gray-800">
            <h4 className="text-xl font-bold text-gray-800 mb-2">🎮 Roblox</h4>
            <p className="mb-4">Wirtualny plac budowy. Twórz własne gry i światy!</p>
            <div className="bg-gray-100 p-4 rounded-lg text-sm">
              <strong>Ważne ustawienia bezpieczeństwa:</strong>
              <ul className="list-disc pl-4 mt-2">
                <li>Prawidłowa data urodzenia (dla ochrony &lt;13 lat)</li>
                <li>Włącz "Ograniczenia konta"</li>
                <li>Wyłącz lub ogranicz czat</li>
                <li>Ustaw PIN rodzicielski</li>
              </ul>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 3: Główne Platformy pod Okiem Rodzica 👨‍👩‍👧</h3>
        <p className="font-bold text-red-600 text-center border-2 border-red-200 p-4 rounded-xl my-4">
          🚨 TO NIE JEST JUŻ TYLKO TWÓJ PROJEKT. TO STAJE SIĘ PROJEKTEM RODZINNYM. 🚨
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-lg text-gray-800">📺 YouTube - Kanał Rodzinny</h4>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Konto należy do rodzica.</li>
              <li>Komentarze: "Przytrzymaj wszystkie do sprawdzenia".</li>
              <li>Filmy domyślnie "Niepubliczne" przed sprawdzeniem.</li>
              <li>Oznaczanie treści "Dla dzieci" (wyłącza reklamy behawioralne).</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-800">🎵 TikTok - Parowanie Rodziny</h4>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Użyj funkcji "Family Pairing".</li>
              <li>Włącz tryb ograniczony.</li>
              <li>Wiadomości prywatne: WYŁĄCZ.</li>
              <li>Konto PRYWATNE na start.</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg text-gray-800">📸 Instagram - Centrum Rodziny</h4>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Konto prywatne (domyślne dla &lt;16 lat).</li>
              <li>Połącz konta w Centrum Rodziny Meta.</li>
              <li>Rodzic widzi czas, obserwujących i zgłoszenia.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'czesc-2',
    title: 'Część II: Twój Arsenał – Narzędzia AI 🤖',
    duration: '20 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold text-purple-800">Witaj w zbrojowni młodego twórcy!</h3>
        <p>
          AI (Sztuczna Inteligencja) to Twój super-mądry asystent. To nie robot z filmów, ale magiczne narzędzie: encyklopedia, która rozmawia, kredki, które same rysują, i nauczyciel muzyki w jednym.
        </p>

        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200 my-6">
          <h4 className="font-bold text-purple-800 mb-2">🤔 Jak działa AI?</h4>
          <p>
            Wyobraź sobie, że pokazujesz dziecku miliony zdjęć kotów. Dziecko uczy się: "kot ma wąsy i uszy". Tak działa AI - uczy się na przykładach.
          </p>
          <p className="mt-2 font-bold">Pamiętaj: AI czasem zmyśla (halucynuje)! Zawsze sprawdzaj informacje.</p>
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 5: Najlepsze Narzędzia (2025) 🛠️</h3>
        
        <div className="grid gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-bold text-indigo-600">1. 📖 Kreebo</h4>
            <p className="text-sm text-gray-600 mb-2">Twój własny ilustrowany bajkopis.</p>
            <p>Opowiadasz historię, AI tworzy ilustracje i składa książkę. Idealne od 6 lat.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-bold text-orange-600">2. 🎨 Scratch with AI</h4>
            <p className="text-sm text-gray-600 mb-2">Programowanie z inteligencją.</p>
            <p>Twórz gry reagujące na ruch kamerą lub rozpoznające mowę. Rozszerzenie klasycznego Scratcha.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-bold text-blue-600">3. 🧩 Teachable Machine</h4>
            <p className="text-sm text-gray-600 mb-2">Naucz komputer!</p>
            <p>Proste narzędzie od Google. Naucz AI rozpoznawać Twoje gesty (np. kciuk w górę) i steruj nimi w grze.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-bold text-pink-600">4. 🎨 Bing Image Creator</h4>
            <p className="text-sm text-gray-600 mb-2">Rysowanie słowami.</p>
            <p>Opisz obrazek ("Różowy kot na księżycu"), a AI go namaluje. Wymaga konta Microsoft rodzica.</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h4 className="text-lg font-bold text-cyan-600">5. 🎨 Canva</h4>
            <p className="text-sm text-gray-600 mb-2">Graficzny kombajn.</p>
            <p>Twórz miniatury na YouTube, plakaty. Używaj "Magic Media" do generowania obrazów i "Background Remover" do usuwania tła.</p>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 6: Pomocnicy Tekstowi ✍️</h3>
        
        <div className="bg-green-50 p-6 rounded-xl border-l-4 border-green-500 my-4">
          <h4 className="font-bold text-green-800">🤖 ChatGPT (Pod nadzorem!)</h4>
          <p className="mb-2">Twój asystent do burzy mózgów. Nigdy nie podawaj mu danych osobowych!</p>
          <ul className="list-disc pl-6 text-sm">
            <li>Wymyślanie pomysłów na filmy</li>
            <li>Pisanie scenariuszy</li>
            <li>Tworzenie list zadań</li>
            <li>Wymyślanie tytułów</li>
          </ul>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-gray-800">🗂️ Notion & Airtable</h4>
          <p>Twoje centrum dowodzenia. Twórz bazy pomysłów, kalendarze publikacji i listy zadań.</p>
        </div>

        <p className="font-bold text-center text-lg text-purple-900 mt-8">
          💡 Złota Zasada: "AI to narzędzie, nie zamiennik. Ty jesteś artystą, AI to Twój magiczny pędzel!"
        </p>
      </div>
    )
  },
  {
    id: 'czesc-3',
    title: 'Część III: Maszyna do Pomysłów 💡',
    duration: '15 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold text-purple-800">Rozdział 7: Gdzie Chować Pomysły? 📝</h3>
        <p>
          Pomysły są jak motyle - piękne, ale ulotne. Musisz je łapać!
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Cyfrowe mapy myśli:</strong> Popplet, Kidspiration.</li>
          <li><strong>Notatniki mobilne:</strong> Google Keep, Notatki (zawsze pod ręką).</li>
          <li><strong>Księga Pomysłów:</strong> Tradycyjny zeszyt do rysowania i pisania.</li>
        </ul>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 8: AI jako Generator Pomysłów 🤖</h3>
        <p>Blokada twórcza? Użyj tych promptów (poleceń) dla AI:</p>

        <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm my-4 space-y-4">
          <div className="bg-white p-3 rounded border border-gray-300">
            <strong>🎬 Filmy:</strong> "Wymyśl 10 zabawnych wyzwań wideo na temat [LEGO]. Filmy dla YouTube Shorts."
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <strong>📖 Scenariusze:</strong> "Napisz krótką historię o [pluszowym misiu], który ożywa w nocy."
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <strong>🎨 Grafika:</strong> "Opisz wygląd logo dla kanału o [nauce]. Ma być kolorowe i przyjazne."
          </div>
          <div className="bg-white p-3 rounded border border-gray-300">
            <strong>📋 Planowanie:</strong> "Stwórz plan treści na 2 tygodnie. Temat: [rysowanie]. Publikacja 3x w tygodniu."
          </div>
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 9: Etyka i Karta Wartości 💎</h3>
        <p>Twoja reputacja to skarb. Przestrzegaj Złotych Zasad:</p>

        <div className="space-y-4 mt-4">
          <div className="flex items-start gap-3">
            <div className="bg-red-100 p-2 rounded text-red-600 font-bold">1</div>
            <div><strong>Prywatność to podstawa:</strong> Nigdy nie ujawniaj nazwiska, adresu, szkoły.</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-green-100 p-2 rounded text-green-600 font-bold">2</div>
            <div><strong>Bądź uprzejmy:</strong> Traktuj innych tak, jak chcesz być traktowany. Nie hejtuj.</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded text-blue-600 font-bold">3</div>
            <div><strong>Szanuj innych:</strong> Nie pokazuj twarzy innych bez pisemnej zgody rodziców.</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-yellow-100 p-2 rounded text-yellow-600 font-bold">4</div>
            <div><strong>Uczciwość:</strong> Oznaczaj reklamy (#reklama, #współpraca).</div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-purple-100 p-2 rounded text-purple-600 font-bold">5</div>
            <div><strong>Wartość:</strong> Twórz treści pomocne, zabawne i pozytywne.</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'czesc-4',
    title: 'Część IV: Twój Plan – Kalendarz Treści 📅',
    duration: '10 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold text-purple-800">Rozdział 10: Po co Ci Kalendarz?</h3>
        <p>Kalendarz to Twój plan treningowy. Dzięki niemu publikujesz regularnie, unikasz stresu i widzisz postępy.</p>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 11: Budowanie z AI</h3>
        <ol className="list-decimal pl-6 space-y-4">
          <li><strong>Zdefiniuj "Słupy Treści":</strong> Np. Rysunki (Pon), Eksperymenty (Śr), Wyzwania (Sob).</li>
          <li><strong>Użyj AI:</strong> Poproś ChatGPT: "Stwórz kalendarz na 4 tygodnie dla 10-latka...".</li>
          <li><strong>Przenieś do narzędzia:</strong> Kalendarz Google, Notion lub zeszyt.</li>
          <li><strong>Bądź elastyczny:</strong> To plan, nie więzienie.</li>
        </ol>
      </div>
    )
  },
  {
    id: 'czesc-5',
    title: 'Część V: Specjalna Sekcja dla Rodziców 👨‍👩‍👧💙',
    duration: '25 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold text-purple-800">Rozdział 12: Dlaczego Twoje Dziecko Chce Być „Influencerem"? 🤔</h3>
        <p>
          Drodzy Rodzice, jeśli czytacie ten rozdział, prawdopodobnie Wasze dziecko wyraziło chęć zostania „influencerem" lub „youtuberem". Może to brzmieć jak kaprys, ale za tym pragnieniem kryje się coś głębszego.
        </p>
        <div className="bg-blue-50 p-6 rounded-xl border-l-4 border-blue-500 my-4">
          <h4 className="font-bold text-blue-800 mb-2">Prawdziwe motywacje dzieci:</h4>
          <ul className="list-disc pl-6 space-y-2">
            <li>🎨 <strong>Potrzeba ekspresji:</strong> Chcą pokazać światu swoją kreatywność.</li>
            <li>👥 <strong>Przynależność:</strong> Widzą rówieśników online, chcą być częścią społeczności.</li>
            <li>🏆 <strong>Uznanie:</strong> Pragną być docenieni za swoje umiejętności.</li>
            <li>📚 <strong>Dzielenie się wiedzą:</strong> Mają pasję i chcą uczyć innych.</li>
            <li>🌟 <strong>Poczucie kontroli:</strong> To JEST ich projekt, którym mogą sterować.</li>
          </ul>
        </div>
        <p>
          To <strong>NIE</strong> jest (zazwyczaj) o sławie, pieniądzach czy lenistwie. Tworzenie treści to ciężka praca! Badania pokazują, że 30% dzieci chce być YouTuberem - to współczesne "chcę być astronautą".
        </p>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 13: Twoja Rola – Przewodnik i Strażnik 🛡️🎬</h3>
        <p>Nie jesteś tylko "rodzicem". Jesteś:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong>🎬 Producentem</strong> – Pomagasz organizować, planować.
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong>🛡️ Strażnikiem Bezpieczeństwa</strong> – Chronisz przed zagrożeniami.
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong>🎓 Mentorem</strong> – Uczysz odpowiedzialności.
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <strong>📱 Administratorem Technicznym</strong> – Zarządzasz kontami.
          </div>
        </div>
        <p>
          <strong>Współtwórczość:</strong> Pomagaj wymyślać pomysły, wspomagaj technicznie (światło, dźwięk), ucz zasad.
          <br />
          <strong>Otwarta komunikacja:</strong> Codziennie pytaj "Jak było dzisiaj online?". Nie oceniaj, wspieraj.
        </p>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 14: Twój Codzienny Checklist dla Bezpiecznej Kreacji ✅</h3>
        <div className="bg-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
          <h4 className="font-bold text-green-800 mb-3">PRZED Nagrywaniem:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">✅ Scenariusz jest przygotowany i zatwierdzony przeze mnie</li>
            <li className="flex items-center gap-2">✅ Miejsce nagrywania jest bezpieczne (brak danych osobowych w tle)</li>
            <li className="flex items-center gap-2">✅ Jeśli są inne dzieci – mam pisemne zgody rodziców</li>
          </ul>
          <h4 className="font-bold text-green-800 mb-3">W TRAKCIE Nagrywania:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">✅ Jestem obecny/a (albo ktoś dorosły)</li>
            <li className="flex items-center gap-2">✅ Monitoruję język i zachowanie</li>
          </ul>
          <h4 className="font-bold text-green-800 mb-3">PO Nagraniu (przed publikacją):</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-center gap-2">✅ Oglądamy film razem</li>
            <li className="flex items-center gap-2">✅ Sprawdzam, czy nie ma danych osobowych</li>
            <li className="flex items-center gap-2">✅ Ustawienia prywatności sprawdzone (początkowo: niepubliczny)</li>
          </ul>
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 15: RODO i GDPR-K – Przewodnik Prawny ⚖️</h3>
        <div className="bg-yellow-50 p-6 rounded-xl border-l-4 border-yellow-500">
          <p className="mb-2"><strong>Wiek zgody (Polska: 16 lat):</strong> Dziecko poniżej 16 lat nie może samodzielnie wyrazić zgody na przetwarzanie danych. Rodzic MUSI zarządzać kontem.</p>
          <p className="mb-2"><strong>Twoje prawa:</strong> Masz prawo dostępu do danych dziecka, prawo do ich usunięcia ("bycia zapomnianym") i sprzeciwu wobec profilowania.</p>
          <p><strong>Zgody osób trzecich:</strong> Jeśli pokazujesz inne dziecko, MUSISZ mieć pisemną zgodę jego rodziców.</p>
        </div>

        <h3 className="text-2xl font-bold text-purple-800 mt-8">Rozdział 16: FAQ dla Rodziców ❓</h3>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer">
            <summary className="font-bold text-purple-700">Czy moje dziecko może mieć kanał na YouTube?</summary>
            <p className="mt-2 text-sm">Tak, ale konto musi należeć do Ciebie (rodzica). Dziecko może być gwiazdą pod Twoim nadzorem.</p>
          </details>
          <details className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer">
            <summary className="font-bold text-purple-700">Co zrobić z hejtem?</summary>
            <p className="mt-2 text-sm">Zablokuj użytkownika, zgłoś komentarz, nie pokazuj dziecku. Wytłumacz, że hejt to problem hejtera.</p>
          </details>
          <details className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer">
            <summary className="font-bold text-purple-700">Czy muszę płacić podatki?</summary>
            <p className="mt-2 text-sm">Tak, jeśli przekroczysz próg (w Polsce kwota wolna od podatku to 30 tys. zł, ale działalność ciągła może wymagać firmy). Skonsultuj się z księgowym.</p>
          </details>
          <details className="bg-white p-4 rounded-lg border border-gray-200 cursor-pointer">
            <summary className="font-bold text-purple-700">Jak chronić wizerunek?</summary>
            <p className="mt-2 text-sm">Można używać avatara, filmować tylko ręce (tutoriale) lub używać delikatnych masek/filtrów.</p>
          </details>
        </div>
      </div>
    )
  },
  {
    id: 'czesc-6',
    title: 'Część VI: Rozwój i Projekty 🚀',
    duration: '45 min',
    content: (
      <div className="space-y-6 text-gray-700 leading-relaxed">
        <h3 className="text-2xl font-bold text-purple-800">Część VI: Rozwijanie Umiejętności Młodego Twórcy 🌱💪</h3>
        
        <h4 className="text-xl font-bold text-purple-700 mt-6">Rozdział 17: Jak Radzić Sobie z Krytyką Online 🛡️</h4>
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <p className="mb-4">Nawet najlepsi twórcy dostają niemiłe komentarze. Ważne, jak reagujesz:</p>
          <ul className="space-y-3">
            <li className="flex items-start gap-2">
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-bold">DOBRA</span>
              <span><strong>Konstruktywna krytyka:</strong> "Muzyka była za głośna". Reakcja: "Dzięki, poprawię!"</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-bold">ZŁA</span>
              <span><strong>Hejt:</strong> "Jesteś beznadziejny". Reakcja: Blokuj, zgłoś, powiedz rodzicom.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-bold">TROLL</span>
              <span><strong>Troling:</strong> Prowokowanie. Reakcja: "Nie karm trolla" - ignoruj.</span>
            </li>
          </ul>
          <p className="mt-4 italic font-bold text-purple-900">Mantra: "Moja wartość nie zależy od komentarzy. Tworzę, bo kocham to robić."</p>
        </div>

        <h4 className="text-xl font-bold text-purple-700 mt-6">Rozdział 18: Budowanie Pewności Siebie 🎥</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li>Zacznij BEZ pokazywania twarzy (tylko ręce, avatar).</li>
          <li>Ćwicz przed lustrem.</li>
          <li>Nagrywaj próby "do szuflady".</li>
          <li>Wyobraź sobie, że mówisz do najlepszego przyjaciela.</li>
          <li>Akceptuj wpadki (bloopers) - to część zabawy!</li>
        </ul>

        <h4 className="text-xl font-bold text-purple-700 mt-6">Rozdział 20: Twój Pierwszy Miesiąc - Plan 🗓️</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-purple-50 p-4 rounded border border-purple-100">
            <strong>Tydzień 1: Przygotowania</strong><br/>
            Konfiguracja kont, burza mózgów, próbne nagranie.
          </div>
          <div className="bg-blue-50 p-4 rounded border border-blue-100">
            <strong>Tydzień 2: Pierwszy Film</strong><br/>
            Nagranie właściwe, prosty montaż, publikacja! 🎉
          </div>
          <div className="bg-green-50 p-4 rounded border border-green-100">
            <strong>Tydzień 3: Interakcja</strong><br/>
            Sprawdzanie komentarzy z rodzicem, planowanie drugiego filmu.
          </div>
          <div className="bg-orange-50 p-4 rounded border border-orange-100">
            <strong>Tydzień 4: Rutyna</strong><br/>
            Eksperymenty, trzeci film, analiza statystyk.
          </div>
        </div>

        <hr className="my-8 border-t-2 border-purple-100" />

        <h3 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 mb-8">
          Część VII: 50+ Ciekawych Projektów 🎨🔬
        </h3>

        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-purple-100 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-purple-800">Projekt 1: "Przedstaw Się Światu" 👋</h4>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Poziom: ⭐ Łatwy</span>
          </div>
          <p className="mb-4 text-lg">Twój pierwszy filmik! Opowiedz, kim jesteś (pseudonim!), ile masz lat i co lubisz robić.</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <strong className="block mb-2 text-purple-700">📝 Kroki:</strong>
              <ol className="list-decimal pl-4 space-y-1 text-sm">
                <li>Napisz krótki scenariusz (5 zdań).</li>
                <li>Ustaw kamerę na stabilnej powierzchni.</li>
                <li>Nagrywaj! Zrób kilka prób.</li>
                <li>Montaż: Dodaj wesołą muzykę.</li>
                <li>Miniaturka: Twoje zdjęcie + napis "Poznaj mnie!".</li>
              </ol>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <strong className="block mb-2 text-blue-700">💡 Wskazówki:</strong>
              <ul className="list-disc pl-4 space-y-1 text-sm">
                <li>Uśmiechaj się!</li>
                <li>Mów wyraźnie, ale naturalnie.</li>
                <li>Dobre światło (najlepiej dzienne).</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl border-2 border-pink-100 mb-12">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-2xl font-bold text-pink-800">Projekt 2: "Dzień z Mojego Życia - Timelapse" ⏰</h4>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold">Poziom: ⭐⭐ Średni</span>
          </div>
          <p className="mb-4 text-lg">Nagraj krótkie klipy przez cały dzień i zmontuj w szybki, 60-sekundowy film. Idealne dla nieśmiałych!</p>
          
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <strong className="block mb-2">📋 Plan Dnia (Przykładowy):</strong>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                <div className="bg-white p-2 rounded border">8:00 - Pobudka</div>
                <div className="bg-white p-2 rounded border">10:00 - Zabawa</div>
                <div className="bg-white p-2 rounded border">13:00 - Hobby</div>
                <div className="bg-white p-2 rounded border">16:00 - Rodzina</div>
                <div className="bg-white p-2 rounded border">19:00 - Sen</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <strong className="block mb-2 text-pink-700">🎥 Jak nagrywać:</strong>
                <ul className="list-disc pl-4 space-y-1 text-sm">
                  <li>Ustaw przypomnienie co godzinę.</li>
                  <li>Nagrywaj po 10 sekund.</li>
                  <li>Nie pokazuj szkoły ani adresu!</li>
                  <li>Pokaż tylko ręce lub sylwetkę z daleka.</li>
                </ul>
              </div>
              <div>
                <strong className="block mb-2 text-purple-700">✂️ Montaż (CapCut):</strong>
                <ol className="list-decimal pl-4 space-y-1 text-sm">
                  <li>Importuj wszystkie 12 klipów.</li>
                  <li>Przyspiesz każdy klip (2x lub 4x).</li>
                  <li>Dodaj napisy z godziną (np. "8:00 AM").</li>
                  <li>Dodaj energiczną muzykę.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-center text-purple-800 mb-6">Bank Pomysłów (Projekty 3-50+) 💡</h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-yellow-200">
            <h5 className="font-bold text-lg text-yellow-700 mb-3">🟡 Dla Początkujących</h5>
            <ul className="space-y-2 text-sm">
              <li><strong>3. Recenzja:</strong> Opowiedz o ulubionej zabawce/książce.</li>
              <li><strong>4. 5 Faktów o [Pasja]:</strong> Edukacyjny filmik.</li>
              <li><strong>5. Unboxing:</strong> Pokaż nową rzecz.</li>
              <li><strong>6. Moja Kolekcja:</strong> Klocki, kamienie, naklejki.</li>
              <li><strong>7. Q&A:</strong> Odpowiedzi na pytania rodziny.</li>
              <li><strong>8. Co w plecaku?:</strong> Bez danych szkoły!</li>
              <li><strong>9. Tour po pokoju:</strong> Moje ulubione miejsce.</li>
              <li><strong>10. Challenge:</strong> Rysowanie bez użycia rąk.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-200">
            <h5 className="font-bold text-lg text-blue-700 mb-3">🔵 Edukacyjne</h5>
            <ul className="space-y-2 text-sm">
              <li><strong>11. Jak to działa?:</strong> Magnes, tęcza, fotosynteza.</li>
              <li><strong>12. Tutorial Rysowania:</strong> Krok po kroku.</li>
              <li><strong>13. Nauka Języka:</strong> 10 słów z obrazkami.</li>
              <li><strong>14. Historia:</strong> Dinozaury, zamki, kosmos.</li>
              <li><strong>15. Wulkan z Sody:</strong> Klasyczny eksperyment.</li>
              <li><strong>16. Triki Matematyczne:</strong> Nauka jest fajna.</li>
              <li><strong>17. Geografia:</strong> Ciekawostki o krajach.</li>
              <li><strong>18. Recenzja Książki:</strong> Zachęć do czytania.</li>
              <li><strong>19. Opieka nad zwierzęciem:</strong> Poradnik.</li>
              <li><strong>20. DIY Edukacyjny:</strong> Model układu słonecznego.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-pink-200">
            <h5 className="font-bold text-lg text-pink-700 mb-3">🔴 Kreatywne i Artystyczne</h5>
            <ul className="space-y-2 text-sm">
              <li><strong>21. Speedpaint:</strong> Przyspieszone rysowanie.</li>
              <li><strong>22. Postać z Losowych Słów:</strong> Wyzwanie kreatywne.</li>
              <li><strong>23. Redesign Postaci:</strong> Twoja wersja bohatera.</li>
              <li><strong>24. Origami:</strong> Składanie papieru.</li>
              <li><strong>25. Malowanie Kamieni:</strong> Sztuka na spacerze.</li>
              <li><strong>26. Customizacja Ubrań:</strong> Markery do tkanin.</li>
              <li><strong>27. Stop-Motion:</strong> Animacja poklatkowa z klocków.</li>
              <li><strong>28. Komiks:</strong> Od pomysłu do strony.</li>
              <li><strong>29. Rzeźba z plasteliny:</strong> Postać 3D.</li>
              <li><strong>30. Gra w Scratchu:</strong> Tutorial tworzenia.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-green-200">
            <h5 className="font-bold text-lg text-green-700 mb-3">🟢 Naukowe i Ekologiczne</h5>
            <ul className="space-y-2 text-sm">
              <li><strong>31. Tęcza w Słoiku:</strong> Gęstość cieczy.</li>
              <li><strong>32. Slime:</strong> Bezpieczny przepis.</li>
              <li><strong>33. Rosnące Kryształy:</strong> Eksperyment.</li>
              <li><strong>34. Grawitacja:</strong> Co spada szybciej?</li>
              <li><strong>35. Bateria z Cytryny:</strong> Fizyka w kuchni.</li>
              <li><strong>41. Zbiórka dla schroniska:</strong> Pomaganie.</li>
              <li><strong>43. Zero Waste:</strong> Jak nie marnować.</li>
              <li><strong>45. Ogródek na parapecie:</strong> Sadzimy zioła.</li>
              <li><strong>47. Recykling Kreatywny:</strong> Coś z niczego.</li>
              <li><strong>50. Podziękowania:</strong> Wdzięczność.</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-xl font-bold text-purple-800 mb-2">To dopiero początek!</p>
          <p className="text-gray-600">Pamiętaj: Bądź autentyczny, dbaj o bezpieczeństwo i baw się dobrze! 🚀</p>
        </div>
      </div>
    )
  }
]
