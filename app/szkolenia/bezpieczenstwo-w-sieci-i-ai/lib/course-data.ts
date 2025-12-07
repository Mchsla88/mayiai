export interface Slide {
  id: string;
  part: number;
  title: string;
  description: string;
  duration: string;
  icon: string;
  content: string;
}

export interface Part {
  id: number;
  title: string;
  icon: string;
  duration: string;
  slides: number[];
}

export const courseParts: Part[] = [
  { id: 1, title: 'Wprowadzenie – Witamy w cyfrowym świecie!', icon: '/icon-rocket-3d.png', duration: '10–12 min', slides: [1, 2, 3] },
  { id: 2, title: 'Zagrożenia w sieci – o czym musicie wiedzieć', icon: '/icon-shield-3d.png', duration: '25–30 min', slides: [4, 5, 6, 7] },
  { id: 3, title: 'Bezpieczne korzystanie z internetu', icon: '/icon-tools-3d.png', duration: '25–30 min', slides: [8, 9, 10, 11] },
  { id: 4, title: 'Świat AI – nowy gracz w grze', icon: '/icon-bulb-3d.png', duration: '25–30 min', slides: [12, 13, 14, 15] },
  { id: 5, title: 'Co robić, gdy coś się stanie?', icon: '/icon-chat-3d.png', duration: '15–20 min', slides: [16, 17, 18] },
  { id: 6, title: 'Tworzymy rodzinne zasady', icon: '/icon-calendar-3d.png', duration: '15–20 min', slides: [19, 20] },
  { id: 7, title: 'Podsumowanie i Q&A', icon: '/icon-camera-3d.png', duration: '10–15 min', slides: [21, 22, 23, 24] },
];

export const slides: Slide[] = [
  // CZĘŚĆ I: Wprowadzenie (1-3)
  {
    id: 'slide-1',
    part: 1,
    title: 'Powitanie',
    description: 'Wprowadzenie do szkolenia o bezpieczeństwie w sieci',
    duration: '3 min',
    icon: '👋',
    content: `
# Powitanie 👋

## Witamy na szkoleniu!

Cześć wszystkim! Dzisiaj będziemy rozmawiać o czymś, co jest częścią waszego codziennego życia – o **internecie** i **sztucznej inteligencji**. Nie będzie nudno, obiecuję!

### Dla dzieci (9–16 lat)

Dzisiejsze szkolenie to nie lista zakazów! To szansa, żeby:
- 🎯 Dowiedzieć się, jak być bezpiecznym w sieci
- 🕵️ Poznać triki oszustów i wiedzieć, jak się przed nimi chronić
- 🆘 Nauczyć się, co zrobić, gdy coś pójdzie nie tak
- 🔒 Chronić swoje dane osobowe i prywatność

### Dla rodziców

Drodzy rodzice, dzisiejsze szkolenie to nie tylko lista zakazów. To szansa, żeby:
- 🌐 Zrozumieć świat, w którym wasze dzieci spędzają czas
- 🤝 Nauczyć się rozmawiać o bezpieczeństwie tak, żeby dzieci do was przychodziły, gdy coś się stanie
- 🛡️ Wspierać dzieci bez nadmiernej kontroli
- 💬 Budować zaufanie i otwartą komunikację

### Wspólny cel

Wypracowanie **rodzinnych zasad bezpieczeństwa cyfrowego**, które będą:
- ✅ Realistyczne
- ✅ Wykonalne
- ✅ Zaakceptowane przez wszystkich członków rodziny
    '
  },
  {
    id: 'slide-2',
    part: 1,
    title: 'Szybka ankieta – poznajmy się!',
    description: 'Interaktywna ankieta dla uczestników',
    duration: '3 min',
    icon: '📊',
    content: '
# Szybka ankieta – poznajmy się! 📊

## Interakcja z uczestnikami

Podnieście rękę lub napiszcie w czacie:

### Pytania dla dzieci:
1. 📱 Kto z was korzysta z TikToka?
2. 🎮 Kto gra w Roblox, Minecraft, Fortnite?
3. 🤖 Kto rozmawiał kiedyś z chatbotem AI (np. ChatGPT, Snapchat AI)?
4. 📺 Ile godzin dziennie spędzacie w internecie?

### Pytania dla rodziców:
1. 👨‍👩‍👧 Czy wiecie, na jakich platformach wasze dzieci spędzają najwięcej czasu?
2. 📱 Czy macie wspólne zasady dotyczące korzystania z urządzeń w domu?
3. 💬 Jak często rozmawiasz z dzieckiem o tym, co robi w internecie?

### Cel tej ankiety:

Pokazać różnorodność doświadczeń, zbudować zaufanie, dać dzieciom poczucie, że ich świat jest rozumiany i traktowany poważnie.

> 💡 **Ważne:** Nie ma złych odpowiedzi! Każde doświadczenie jest cenne.
    `
  },
  {
    id: 'slide-3',
    part: 1,
    title: 'Dlaczego o tym mówimy?',
    description: 'Powody i cele szkolenia',
    duration: '4 min',
    icon: '🤔',
    content: `
# Dlaczego o tym mówimy? 🤔

## Dla dzieci (9–16 lat)

### Internet to niesamowite miejsce!

- 🎨 Możesz tworzyć i dzielić się swoją twórczością
- 🎓 Uczyć się nowych rzeczy
- 👥 Poznawać ciekawych ludzi z całego świata
- 🎮 Bawić się i rozwijać swoje pasje

### Ale… są też pułapki

- 😟 Nieznajomi, którzy udają kogoś innego
- 💸 Oszuści próbujący wyłudzić pieniądze lub dane
- 😢 Cyberprzemoc i hejt
- 🚫 Treści, które mogą być dla ciebie szkodliwe

## Dla rodziców

### Świat się zmienił

Kiedy byliśmy młodzi, internet wyglądał zupełnie inaczej. Dziś wasze dzieci żyją w świecie:

- 📱 Ciągłego dostępu do informacji
- 🤖 Sztucznej inteligencji w każdej aplikacji
- 🌍 Globalnej społeczności online
- 🎯 Targetowanych reklam i algorytmów

### Nasze wyzwanie

Jak być wsparciem, nie zamykając dzieci w klatce? Jak nauczyć je rozważnych decyzji zamiast tylko zakazywać?

> 💬 **Pamiętaj:** Celem nie jest strach, ale świadomość i umiejętność podejmowania mądrych decyzji.
    '
  },

  // CZĘŚĆ II: Zagrożenia w sieci (4-7)
  {
    id: 'slide-4',
    part: 2,
    title: 'Nieznajomi w internecie',
    description: 'Jak rozpoznać i unikać zagrożeń ze strony nieznajomych online',
    duration: '6 min',
    icon: '👤',
    content: '
# Nieznajomi w internecie 👤

## Kto to jest "nieznajomy"?

### W prawdziwym życiu vs w internecie

**W prawdziwym życiu:**
- Widzisz osobę
- Możesz ocenić wiek, wygląd
- Trudniej komuś udawać kogoś innego

**W internecie:**
- Nie widzisz osoby
- Łatwo udawać kogoś innego
- Można zmienić wiek, płeć, zdjęcie profilowe

## Czerwone flagi 🚩

Uważaj na osoby, które:

1. **Proszą o spotkanie w prawdziwym życiu** - zwłaszcza bez wiedzy rodziców
2. **Pytają o dane osobowe** - adres, nazwisko, numer telefonu, szkołę
3. **Proszą o zdjęcia** - szczególnie w stroju kąpielowym lub bez ubrania
4. **Oferują prezenty lub pieniądze** - nic nie jest za darmo
5. **Proszą o zachowanie tajemnicy** - "nie mów rodzicom o naszej rozmowie"
6. **Mówią, że jesteś wyjątkowy/wyjątkowa** - próbują zbudować emocjonalną więź
7. **Szybko chcą przejść na inną platformę** - np. z Instagrama na WhatsApp

## Grooming – co to jest?

**Grooming** to proces, w którym osoba dorosła manipuluje dzieckiem, żeby:
- Zbudować zaufanie
- Wykorzystać je seksualnie lub do innych celów

### Jak to wygląda?

1. **Faza 1:** Zaprzyjaźnienie się ("jesteś świetny, rozumiem cię")
2. **Faza 2:** Izolacja ("nikt nie rozumie ciebie tak jak ja")
3. **Faza 3:** Seksualizacja rozmów ("prześlij mi zdjęcie")
4. **Faza 4:** Szantaż ("jak nie wyślesz, pokażę to twoim rodzicom")

## Co robić?

### ✅ Bezpieczne zachowania:

- **Nie udostępniaj danych osobowych** (adres, telefon, szkoła)
- **Nie akceptuj zaproszeń do spotkań** bez zgody rodziców
- **Nie wysyłaj prywatnych zdjęć** nikomu, kogo nie znasz osobiście
- **Zgłaszaj podejrzane rozmowy** rodzicom lub zaufanej osobie dorosłej
- **Blokuj i raportuj** osoby, które zachowują się dziwnie

### 🆘 Jeśli czujesz się niekomfortowo:

1. **Nie odpowiadaj** na dalsze wiadomości
2. **Zrób screenshot** rozmowy
3. **Powiedz rodzicowi** lub innemu dorosłemu, któremu ufasz
4. **Zablokuj** osobę
5. **Zgłoś** na platformie

> ⚠️ **Pamiętaj:** Nigdy nie jesteś winny/winna, jeśli ktoś próbuje cię wykorzystać. Zawsze możesz poprosić o pomoc.
    `
  },
  {
    id: 'slide-5',
    part: 2,
    title: 'Phishing i oszustwa',
    description: 'Jak rozpoznać próby wyłudzenia danych i oszustwa online',
    duration: '6 min',
    icon: '🎣',
    content: `
# Phishing i oszustwa 🎣

## Co to jest phishing?

**Phishing** to próba wyłudzenia twoich danych (hasła, numery kart, dane osobowe) poprzez podszywanie się pod zaufane źródło.

### Przykłady:

- 📧 Email od "Netflixa" z prośbą o aktualizację karty kredytowej
- 💬 SMS od "banku" z linkiem do "potwierdzenia transakcji"
- 🎁 Wiadomość na Instagramie: "Wygrałeś iPhone'a! Kliknij tu!"
- 🎮 Link w grze: "Darmowe V-Bucks/Robux!"

## Jak rozpoznać phishing?

### 🚩 Czerwone flagi:

1. **Pilność i strach**
   - "Twoje konto zostanie zablokowane za 24h!"
   - "Natychmiastowe działanie wymagane!"

2. **Za piękne, żeby było prawdziwe**
   - "Wygrałeś iPhone'a 15 Pro!"
   - "Darmowe 10,000 V-Bucks!"
   - "Kliknij tu po 1000 PLN!"

3. **Dziwny adres nadawcy**
   - noreply@netfliix.com (zauważ dwa 'i')
   - service@amaz0n.com (zero zamiast 'o')

4. **Prośba o dane osobowe**
   - "Podaj hasło"
   - "Wpisz numer karty kredytowej"
   - "Potwierdź dane logowania"

5. **Błędy językowe**
   - Dziwne tłumaczenie
   - Błędy gramatyczne
   - Mieszanka języków

## Najpopularniejsze oszustwa

### 1. Fałszywe konkursy

❌ **Oszustwo:** "Wygrałeś nagrody! Podaj dane kontaktowe i adres do wysyłki."

✅ **Prawda:** Prawdziwe konkursy nie proszą o dane karty kredytowej ani hasła.

### 2. Darmowe waluty w grach

❌ **Oszustwo:** "Wejdź na ten link i dostaniesz darmowe V-Bucks/Robux!"

✅ **Prawda:** Nie ma darmowych walut w grach. Oficjalne gry nie oferują takich promocji przez zewnętrzne strony.

### 3. Fałszywe oferty pracy

❌ **Oszustwo:** "Zarabiaj 5000 zł miesięcznie pracując 2h dziennie!"

✅ **Prawda:** Oferty wymagają wpłaty lub danych osobowych.

### 4. "Tech support" scam

❌ **Oszustwo:** Wyskakujące okno "Twój komputer jest zainfekowany! Zadzwoń pod numer..."

✅ **Prawda:** Prawdziwe firmy nie wyświetlają takich ostrzeżeń.

## Co robić, gdy podejrzewasz phishing?

### ✅ Bezpieczne kroki:

1. **Nie klikaj w linki** w podejrzanych wiadomościach
2. **Sprawdź adres nadawcy** (czy to oficjalny adres firmy?)
3. **Idź bezpośrednio** na stronę firmy (wpisz adres ręcznie w przeglądarce)
4. **Skontaktuj się** z firmą oficjalnym kanałem
5. **Zgłoś phishing** na platformie (Gmail, Outlook mają opcję "Zgłoś spam/phishing")

### 🆘 Jeśli kliknąłeś w link phishingowy:

1. **Nie wpisuj danych** na podejrzanej stronie
2. **Zamknij przeglądarkę**
3. **Zmień hasła** na wszystkich ważnych kontach
4. **Powiedz rodzicom**
5. **Skanuj komputer** antywirusem

> 💡 **Złota zasada:** Jeśli coś wydaje się za piękne, żeby było prawdziwe – prawdopodobnie nie jest prawdziwe.
    '
  },
  {
    id: 'slide-6',
    part: 2,
    title: 'Cyberprzemoc i hejt',
    description: 'Jak reagować na cyberprzemoc i chronić się przed hejtem',
    duration: '7 min',
    icon: '😢',
    content: '
# Cyberprzemoc i hejt 😢

## Co to jest cyberprzemoc?

**Cyberprzemoc** to celowe i powtarzające się krzywdzenie innych ludzi za pomocą technologii (telefony, komputery, social media).

### Rodzaje cyberprzemocy:

1. **Hejt** – obraźliwe komentarze, wyzwiska
2. **Trolling** – celowe prowokowanie i drażnienie
3. **Wykluczanie** – celowe pomijanie kogoś w grupach online
4. **Doxing** – publikowanie prywatnych informacji o kimś bez zgody
5. **Impersonation** – podszywanie się pod kogoś
6. **Cyberstalking** – uporczywe nękanie online

## Jak rozpoznać cyberprzemoc?

### 🚩 Znaki ostrzegawcze:

**U ofiary:**
- Zmiana zachowania (zamknięcie w sobie, smutek)
- Unikanie telefonu/komputera
- Nagła utrata zainteresowania mediami społecznościowymi
- Problemy ze snem
- Spadek ocen w szkole
- Nerwowość przy sprawdzaniu wiadomości

**U sprawcy:**
- Ukrywanie ekranu telefonu
- Nadmierne zaangażowanie w media społecznościowe
- Śmiech z cudzego nieszczęścia

## Dla ofiar: Co robić?

### ✅ Natychmiastowe działania:

1. **Nie odpowiadaj** na prowokacje
   - Hejterzy żywią się reakcją
   - Im więcej odpowiadasz, tym bardziej eskalują

2. **Zrób screenshot** dowodów
   - Zapisz obraźliwe wiadomości
   - Zrób zdjęcie ekranu przed zablokowaniem

3. **Zablokuj i zgłoś** sprawcę
   - Na każdej platformie jest opcja zgłaszania
   - Zablokuj osobę, żeby nie mogła dalej kontaktować się

4. **Powiedz dorosłemu** któremu ufasz
   - Rodzic, nauczyciel, psycholog szkolny
   - To NIE jest "skarżenie" – to szukanie pomocy

5. **Zachowaj dowody** na wypadek potrzeby zgłoszenia na policję

### 🛑 Czego NIE robić:

- ❌ Nie odpowiadaj agresją na agresję
- ❌ Nie mść się (nie stajesz się lepszy niż sprawca)
- ❌ Nie ukrywaj problemu (nie przejdzie sam)
- ❌ Nie wierz w obraźliwe komentarze (to mówi więcej o sprawcy niż o tobie)

## Dla obserwatorów: Jak pomóc?

### 💪 Bystanderzy mają moc!

**Jeśli widzisz cyberprzemoc:**

1. **Nie dołączaj** do hejtu (nawet żartem)
2. **Nie udostępniaj** obraźliwych postów
3. **Wyraź wsparcie** dla ofiary (prywatnie lub publicznie)
4. **Zgłoś** post/komentarz na platformie
5. **Powiedz dorosłemu** o sytuacji

> 💬 **Pamiętaj:** Milczenie = przyzwolenie. Twój głos ma znaczenie.

## Dla rodziców: Jak reagować?

### 🤝 Wsparcie dziecka:

1. **Wysłuchaj bez osądzania**
   - "Dziękuję, że mi powiedziałeś/powiedziałaś"
   - "To nie twoja wina"

2. **Nie odbieraj urządzeń**
   - Dla dziecka to kara, nie pomoc
   - Odcięcie od świata online = izolacja

3. **Dokumentuj przypadki**
   - Screenshoty z datą i godziną
   - Lista platform, na których występuje przemoc

4. **Zgłoś na platformie**
   - Facebook, Instagram, TikTok mają procedury zgłaszania

5. **Kontakt ze szkołą**
   - Jeśli sprawca to kolega/koleżanka z klasy
   - Szkoła ma obowiązek interweniować

6. **Policja/prokuratura**
   - Jeśli przemoc jest poważna (groźby, szantaż)
   - Cyberprzemoc to przestępstwo (art. 190a Kodeksu Karnego)

## Gdzie szukać pomocy?

### 📞 Numery telefonu:

- **116 111** – Telefon Zaufania dla Dzieci i Młodzieży
- **800 100 100** – Helpline dla ofiar przemocy w sieci
- **112** – W przypadku bezpośredniego zagrożenia

### 🌐 Strony internetowe:

- **www.fdds.pl** – Fundacja Dajemy Dzieciom Siłę
- **www.sieciaki.pl** – Porady dla dzieci i rodziców
- **www.dyzurnet.pl** – Zgłaszanie nielegalnych treści

> 💙 **Pamiętaj:** Nie jesteś sam/sama. Zawsze jest ktoś, kto może pomóc.
    `
  },
  {
    id: 'slide-7',
    part: 2,
    title: 'Treści nieodpowiednie',
    description: 'Jak rozpoznać i unikać szkodliwych treści w internecie',
    duration: '6 min',
    icon: '🚫',
    content: `
# Treści nieodpowiednie 🚫

## Co to są "treści nieodpowiednie"?

To materiały, które mogą być szkodliwe dla twojego rozwoju emocjonalnego, psychicznego lub fizycznego.

### Rodzaje treści nieodpowiednich:

1. **Treści pornograficzne** 🔞
2. **Przemoc i brutalne sceny** 🔪
3. **Narkotyki i alkohol** 💊
4. **Autoagresja i samobójstwa** 😔
5. **Ekstremizm i radykalizacja** ⚠️
6. **Mowa nienawiści** 🗣️
7. **Dezinformacja i fake news** 📰

## Dlaczego to jest problem?

### Wpływ na rozwój:

**Dla młodszych dzieci (9–12 lat):**
- Mogą nie rozumieć kontekstu
- Traumatyczne obrazy zostają w pamięci
- Zniekształcone postrzeganie rzeczywistości

**Dla nastolatków (13–16 lat):**
- Normalizacja szkodliwych zachowań
- Presja do naśladowania
- Wpływ na zdrowie psychiczne

## Treści związane z autoagresją

### 🚨 Szczególnie niebezpieczne:

**Social media często pokazuje:**
- Idealne życie innych (co obniża twoją samoocenę)
- "Trendy" związane z dietami, wyglądem
- Treści glamoryzujące zaburzenia odżywiania
- Wyzwania ("challenges") które mogą być niebezpieczne

### Jak sobie radzić?

1. **Ogranicz czas w social media** (ustaw limity w telefonie)
2. **Obserwuj pozytywne konta** (które budują, a nie niszczą)
3. **Pamiętaj: to tylko wycinek** (nikt nie pokazuje wszystkiego)
4. **Rozmawiaj z kimś** jeśli czujesz, że treści cię przytłaczają

## Fake news i dezinformacja

### Jak rozpoznać fake news?

**Sprawdź:**
1. **Źródło** – Czy to wiarygodna strona?
2. **Data** – Czy to aktualna informacja?
3. **Inne źródła** – Czy inne media też o tym piszą?
4. **Zdjęcia** – Czy nie są zmontowane? (użyj Google Images reverse search)
5. **Ton** – Czy jest histeryczny/clickbaitowy?

### 🚩 Czerwone flagi fake news:

- Tytuły pisane WIELKIMI LITERAMI!!!
- Brak autora artykułu
- Strona pełna reklam
- Tylko jedno źródło podaje tę informację
- "Lekarze nie chcą, żebyś o tym wiedział!"

## Algorytmy i "królicze nory"

### Jak algorytmy wpływają na ciebie?

**YouTube, TikTok, Instagram pokazują ci więcej tego, co klikasz.**

**Przykład:**
1. Oglądasz jeden film o dietach
2. Algorytm myśli: "Lubi diety!"
3. Pokazuje ci JESZCZE WIĘCEJ filmów o dietach
4. W końcu widzisz ekstremalne treści o "idealnym ciele"

### Jak się chronić?

✅ **Aktywnie kształtuj swój feed:**
- Klikaj "Nie interesuje mnie" na treściach, które cię przytłaczają
- Szukaj pozytywnych treści
- Obserwuj różnorodne źródła

✅ **Rób przerwy:**
- Jeśli czujesz, że social media cię drenują – zrób detoks
- Usuń aplikację na weekend

## Co robić, gdy natkniesz się na nieodpowiednie treści?

### ✅ Kroki:

1. **Zamknij treść** natychmiast
2. **Zgłoś** na platformie (przycisk "Report")
3. **Zablokuj** konto, które to opublikowało
4. **Powiedz rodzicowi** jeśli treść była szczególnie niepokojąca
5. **Nie udostępniaj** nikomu (nawet jako ostrzeżenie – tylko wzmacniasz zasięg)

### 🆘 Jeśli treść cię zdenerwowała:

- Porozmawiaj z kimś o tym
- Zrób coś innego (wyjdź na spacer, posłuchaj muzyki)
- Pamiętaj: to NIE TWOJA wina, że na to trafiłeś/trafiłaś

## Dla rodziców: Kontrola rodzicielska

### Narzędzia:

1. **YouTube Kids** – bezpieczniejsza wersja YouTube
2. **Kontrola rodzicielska Google** – ograniczenia na urządzeniach Android
3. **Screen Time (iOS)** – limity aplikacji, filtrowanie treści
4. **Bezpieczne wyszukiwarki** – np. Kiddle.co

### ⚠️ Ale pamiętaj:

Kontrola rodzicielska to tylko narzędzie. Najważniejsze to:
- **Rozmowa** z dzieckiem
- **Budowanie zaufania**
- **Edukacja** jak rozpoznawać niebezpieczne treści

> 💬 "Kontrola vs Zaufanie" – szukaj balansu!
    '
  },

  // CZĘŚĆ III: Bezpieczne korzystanie z internetu (8-11)
  {
    id: 'slide-8',
    part: 3,
    title: 'Hasła i loginy',
    description: 'Jak tworzyć silne hasła i chronić konta',
    duration: '6 min',
    icon: '🔑',
    content: '
# Hasła i loginy 🔑

## Dlaczego hasła są ważne?

Twoje hasło to **klucz do twojego cyfrowego życia**:
- 📧 Email
- 🎮 Konta w grach
- 📱 Social media
- 🏦 Aplikacje bankowe (dla rodziców)

Słabe hasło = otwarte drzwi dla hakerów!

## Jak wygląda SŁABE hasło?

### ❌ Najgorsze hasła 2024:

1. **123456**
2. **password**
3. **qwerty**
4. **abc123**
5. **TwojeDateUrodzenia**
6. **TwojeImię123**

### Dlaczego są słabe?

- Łatwe do odgadnięcia
- Hakerzy mają listy najpopularniejszych haseł
- Programy potrafią złamać takie hasło w **sekundy**

## Jak stworzyć SILNE hasło?

### ✅ Zasady:

1. **Minimum 12 znaków** (im dłuższe, tym lepsze)
2. **Mieszanka:**
   - WIELKIE litery (A, B, C)
   - małe litery (a, b, c)
   - Cyfry (1, 2, 3)
   - Znaki specjalne (!, @, #, $)

3. **Nie używaj słów ze słownika**
4. **Nie używaj dat urodzenia, imion, nazw ulic**
5. **Każde konto = inne hasło**

### Metoda "Passphrase" (fraza hasłowa)

**Zamiast:** 'Maria2010'

**Użyj:** 'K0t!LubiRy8ę#Rano'

**Jak to działa?**
- Wybierz zdanie: "Kot lubi rybę rano"
- Zamień litery na cyfry: 'o' → '0', 'i' → '!', 'b' → '8'
- Dodaj znaki specjalne: '#', '!'
- Wymieszaj małe i wielkie litery

### Przykłady silnych haseł:

- 'M0jaKa7kA!Lubi$p4ć' (Moja katka lubi spać)
- 'Gra2024#Je$tSuper!' (Gra 2024 jest super)
- 'Pi3s'Pi3s&K0t=Przyjaciele'K0t=Przyjaciele' (Pies i kot to przyjaciele)

## Menedżer haseł – twój najlepszy przyjaciel

### Co to jest?

**Menedżer haseł** to aplikacja, która:
- Przechowuje wszystkie hasła w jednym bezpiecznym miejscu
- Generuje silne, losowe hasła
- Automatycznie wypełnia formularze logowania

### Popularne menedżery:

1. **Bitwarden** (darmowy, open-source)
2. **1Password** (płatny, bardzo bezpieczny)
3. **Dashlane** (darmowa wersja z limitem)
4. **LastPass** (darmowy z ograniczeniami)

### Jak to działa?

1. Tworzysz **jedno główne hasło** (MASTER PASSWORD)
2. Menedżer generuje **unikalne hasła** dla każdej strony
3. Ty musisz pamiętać **tylko to jedno główne hasło**

## Uwierzytelnianie dwuskładnikowe (2FA)

### Co to jest?

**2FA** = Dwa kroki do zalogowania:
1. **Hasło** (coś co wiesz)
2. **Kod z telefonu** (coś co masz)

### Jak to wygląda?

1. Wpisujesz hasło
2. Dostajesz SMS/kod w aplikacji (np. Google Authenticator)
3. Wpisujesz kod
4. Jesteś zalogowany!

### Dlaczego to ważne?

Nawet jeśli ktoś ukradnie twoje hasło, **NIE MOŻE SIĘ ZALOGOWAĆ** bez dostępu do twojego telefonu!

### Jak włączyć 2FA?

**Na większości platform:**
1. Idź do Ustawień
2. Szukaj "Bezpieczeństwo" lub "Security"
3. Włącz "Two-Factor Authentication" (2FA)
4. Wybierz metodę: SMS lub Aplikacja (aplikacja bezpieczniejsza!)

## Najczęstsze błędy

### ❌ Czego NIE robić:

1. **Nie udostępniaj haseł** (nawet najlepszemu przyjacielowi)
2. **Nie zapisuj haseł** w notatkach w telefonie
3. **Nie używaj tego samego hasła** wszędzie
4. **Nie klikaj "Zapamiętaj hasło"** na cudzym komputerze
5. **Nie wpisuj haseł** na publicznym WiFi bez VPN

## Co robić, gdy ktoś zna twoje hasło?

### 🆘 Natychmiastowe działania:

1. **ZMIEŃ HASŁO** natychmiast
2. **Sprawdź aktywność** na koncie ("Ostatnie logowania")
3. **Wyloguj wszystkie urządzenia** (opcja w ustawieniach)
4. **Włącz 2FA** jeśli jeszcze nie masz
5. **Zmień hasła na innych kontach** (jeśli używałeś tego samego)

## Dla rodziców: Jak zarządzać hasłami dzieci?

### 🤝 Wspólne podejście:

1. **Utwórzcie wspólny menedżer haseł rodzinny**
   - Bitwarden, 1Password mają opcję "Family Plan"
   - Rodzic ma dostęp, ale dziecko też może używać

2. **Naucz dziecko dobrych nawyków**
   - Nie podawaj hasła przez telefon/SMS
   - Nie zapisuj na karteczce

3. **Regularnie sprawdzajcie bezpieczeństwo**
   - Czy hasła są aktualne?
   - Czy 2FA jest włączone?

> 🔒 **Złota zasada:** Twoje hasło to twoja własność. Nie udostępniaj go nikomu – nawet rodzicom (chyba że mają dostęp przez menedżer haseł).
    `
  },
  {
    id: 'slide-9',
    part: 3,
    title: 'Co możesz, a czego nie możesz udostępniać',
    description: 'Zasady bezpiecznego udostępniania informacji online',
    duration: '6 min',
    icon: '🔒',
    content: `
# Co możesz, a czego nie możesz udostępniać 🔒

## Twoje dane osobowe = złoto dla przestępców

### Dlaczego hakerzy chcą twoich danych?

- 💳 Kradzież tożsamości
- 💰 Oszustwa finansowe
- 🏠 Włamania (wiedzą, kiedy nie ma cię w domu)
- 📞 Nękanie i stalking

## NIE UDOSTĘPNIAJ (NIGDY!)

### 🚫 Informacje zabroni one:

1. **Pełne imię i nazwisko**
2. **Adres domowy** (ulica, numer domu, miasto)
3. **Numer telefonu**
4. **Nazwa szkoły** (nawet logo na zdjęciu)
5. **Data urodzenia** (rok może być OK, ale nie pełna data)
6. **Numer PESEL**
7. **Dane rodziców** (imiona, miejsca pracy)
8. **Plany wakacyjne** ("Jedziemy na 2 tygodnie do...")
9. **Godziny, kiedy nie ma cię w domu**
10. **Hasła i kody PIN**

### Przykłady złych postów:

❌ "Właśnie przeprowadziłem się na ul. Kwiatową 15!"

❌ "Za 2 dni lecę na wakacje do Hiszpanii na 2 tygodnie!"

❌ "Moja mama pracuje w banku PKO na Mokotowie."

❌ "Numer mojego telefonu: 123-456-789, dzwońcie!"

## MOŻESZ UDOSTĘPNIAĆ (z rozwagą)

### ✅ Informacje względnie bezpieczne:

1. **Twoje zainteresowania** ("Lubię malować", "Gram w Minecrafta")
2. **Ogólna lokalizacja** ("Mieszkam w Warszawie" - bez adresu)
3. **Wiek** ("Mam 12 lat" - zamiast pełnej daty urodzenia)
4. **Zdjęcia** (bez lokalizacji GPS, bez znaków rozpoznawczych)

### ⚠️ Ale pamiętaj:

**Połączenie wielu "bezpiecznych" informacji może stworzyć pełny obraz!**

**Przykład:**
- Post 1: "Lubię grać w Roblox"
- Post 2: "Chodzę do szkoły w Warszawie"
- Post 3: Zdjęcie w mundurku szkolnym (z logo szkoły)
- Post 4: "Mieszkam niedaleko parku Łazienki"

**Efekt:** Ktoś może ustalić twoją szkołę i okolicę, gdzie mieszkasz.

## Zdjęcia – ukryte niebezpieczeństwa

### 📸 Dane EXIF

**Co to jest?**
- Zdjęcia z telefonu zawierają **metadane**:
  - Lokalizacja GPS (dokładna szerokość i długość geograficzna)
  - Data i godzina
  - Model telefonu

**Jak się chronić?**
1. **Wyłącz lokalizację** w ustawieniach aparatu
2. **Usuń dane EXIF** przed publikacją (aplikacje: EXIF Eraser, Scrambled Exif)
3. **Większość social mediów usuwa EXIF automatycznie** (ale lepiej sprawdzić!)

### 🏠 Zdjęcia w domu

Uważaj na:
- **Numery domów** w tle
- **Tablice rejestracyjne samochodów**
- **Nazwy ulic** na znakach
- **Logo szkoły** na mundurku

## Social media – co pokazujesz światu?

### Instagram, TikTok, Snapchat

**Sprawdź ustawienia prywatności:**

✅ **Konto prywatne** (tylko zatwierdzeni obserwujący widzą posty)

✅ **Ukryj lokalizację** (nie taguj dokładnej lokalizacji)

✅ **Wyłącz "Pokaż status online"** (nikt nie musi wiedzieć, kiedy jesteś online)

✅ **Ogranicz, kto może ci wysyłać wiadomości** (tylko znajomi)

### Pytania przed publikacją:

🤔 "Czy ten post może być użyty przeciwko mnie?"

🤔 "Czy pokazuję coś, co pomaga zidentyfikować moją lokalizację?"

🤔 "Czy chciałbym, żeby moja babcia/nauczyciel to zobaczył?"

## Quizy i wyzwania online

### 🚩 Uwaga na "niewinne" quizy!

**Przykłady:**
- "Jak brzmiałoby twoje imię jako księżniczki Disneya? [Imię mamy + ulica]"  
  → To pytania używane do **resetowania hasła**!

- "10 rzeczy o mnie" challenge  
  → Udostępniasz dane osobowe publicznie!

### Co to naprawdę znaczy?

**Quiz: "Jakie jest twoje drugie imię?"**  
→ Hakerzy zbierają odpowiedzi na **pytania bezpieczeństwa**!

## Dla rodziców: Jak nauczyć dziecko?

### 🗣️ Rozmowa zamiast zakazu:

1. **"Dlaczego myślisz, że to bezpieczne?"**
   - Zamiast: "Nie wolno ci tego publikować!"

2. **Symuluj zagrożenie:**
   - "Gdyby ktoś zły zobaczył to zdjęcie, co mógłby się dowiedzieć?"

3. **Ustalcie wspólnie zasady:**
   - "Sprawdźmy razem ustawienia prywatności"
   - "Który post byłby OK, a który nie?"

### 📱 Wspólne ćwiczenia:

1. **Audit konta dziecka razem**
   - Przeglądnijcie profile dzieci
   - Sprawdźcie, czy nie ma udostępnionych danych osobowych

2. **Stwórzcie "Checklist przed publikacją"**
   - ☐ Czy zdjęcie nie pokazuje adresu?
   - ☐ Czy wyłączono lokalizację GPS?
   - ☐ Czy nie ma danych osobowych w opisie?

> 🔒 **Pamiętaj:** Internet to miejsce publiczne. Wszystko, co opublikujesz, może tam zostać NA ZAWSZE.

## Test: Co jest OK, a co NIE?

### Sprawdź swoją wiedzę:

1. ✅ "Uwielbiam grać w Fortnite!"  
   → OK (ogólne zainteresowanie)

2. ❌ "Mój numer telefonu: 123-456-789"  
   → NIE (dane kontaktowe)

3. ⚠️ "Mieszkam w Warszawie"  
   → OK, ale bez szczegółów!

4. ❌ "Za tydzień lecę na wakacje! Dom będzie pusty."  
   → NIE (informacja dla włamywaczy)

5. ✅ "Dzisiaj świętujemy urodziny!"  
   → OK (bez podawania pełnej daty)

> 💡 **Złota zasada:** Jeśli nie chciałbyś, żeby nieznajomy na ulicy to wiedział – nie publikuj w internecie!
    '
  },
  {
    id: 'slide-10',
    part: 3,
    title: 'Zasady korzystania z urządzeń w domu',
    description: 'Ustalanie rodzinnych zasad użytkowania technologii',
    duration: '7 min',
    icon: '📱',
    content: '
# Zasady korzystania z urządzeń w domu 📱

## Dlaczego potrzebujemy zasad?

### Problem:
- 📱 Dzieci spędzają zbyt dużo czasu online
- 👨‍👩‍👧 Konflikty między rodzicami a dziećmi o ekrany
- 😴 Problemy ze snem (telefon do późnej nocy)
- 👁️ Zmęczenie oczu
- 📚 Zaniedbywanie nauki i obowiązków

### Rozwiązanie:

**Rodzinna umowa cyfrowa** - jasne zasady zaakceptowane przez wszystkich!

> ⚡ Zasady bez kar = porażka. Zasady bez wyjaśnienia = bunt.
    `
  },
  {
    id: 'slide-11',
    part: 3,
    title: 'Rozmowa – najważniejsze narzędzie',
    description: 'Jak budować zaufanie i otwartą komunikację o internecie',
    duration: '6 min',
    icon: '💬',
    content: `
# Rozmowa – najważniejsze narzędzie 💬

## Dlaczego rozmowa jest ważniejsza niż kontrola?

### Zaufanie vs Strach

- 🔒 **Kontrola** = Dziecko ukryje przed tobą problemy
- 💬 **Rozmowa** = Dziecko przyjdzie do ciebie, gdy coś się stanie

### Dla rodziców:

1. **Pytaj o internet** tak jak pytasz o szkołę
2. **Nie karz za szczerość** - dziecko musi wiedzieć, że może powiedzieć prawdę
3. **Bądź ciekawy, nie krytyczny** - "Opowiedz mi o tej grze" zamiast "Znowu grasz?!"

> 💡 **Cel**: Chcesz być pierwszą osobą, do której dziecko przyjdzie z problemem!
    '
  },

  // CZĘŚĆ IV: Świat AI (12-15)
  {
    id: 'slide-12',
    part: 4,
    title: 'Czym jest AI i gdzie się z nią spotykasz',
    description: 'Wprowadzenie do sztucznej inteligencji w codziennym życiu',
    duration: '6 min',
    icon: '🤖',
    content: '
# Czym jest AI i gdzie się z nią spotykasz 🤖

## Sztuczna Inteligencja (AI) - co to jest?

AI to programy komputerowe, które potrafią:
- 🧠 Uczyć się
- 💭 Podejmować decyzje
- 🗣️ Rozmawiać
- 🎨 Tworzyć

### Gdzie spotykasz AI każdego dnia?

1. **YouTube/TikTok** - algorytmy rekomendujące filmy
2. **ChatGPT/Snapchat AI** - chatboty do rozmowy
3. **Siri/Google Assistant** - asystenci głosowi
4. **Filtry na Instagramie** - rozpoznawanie twarzy
5. **Gry** - inteligentni przeciwnicy

> 💡 AI może być pomocnikiem, ale też niesie ryzyka!
    `
  },
  {
    id: 'slide-13',
    part: 4,
    title: 'Deepfake\'i i dezinformacja',
    description: 'Jak rozpoznać fałszywe treści generowane przez AI',
    duration: '7 min',
    icon: '🎭',
    content: `
# Deepfake'i i dezinformacja 🎭

## Co to jest deepfake?

**Deepfake** = Fałszywe wideo/audio stworzone przez AI

### Przykłady:

- 🎥 Film z twarzą znanej osoby (ale to nie ona mówi!)
- 🗣️ Nagranie głosowe rodzica (ale to AI!)
- 🖼️ Zdjęcia, które wyglądają prawdziwie (ale są wygenerowane)

### Jak rozpoznać deepfake?

🚩 **Czerwone flagi:**
- Dziwne ruchy ust
- Nienaturalne mruganie
- Niedopasowany głos
- Pixel artifacts wokół twarzy

> ⚠️ Nigdy nie wierz ślepo w to, co widzisz w internecie!
    '
  },
  {
    id: 'slide-14',
    part: 4,
    title: 'Prywatność a AI',
    description: 'Jak chronić swoje dane przed sztuczną inteligencją',
    duration: '6 min',
    icon: '🔐',
    content: '
# Prywatność a AI 🔐

## Co AI wie o tobie?

### AI zbiera dane z:

- 📱 Twoich wyszukiwań
- 💬 Rozmów w chatbotach
- 📍 Lokalizacji
- 👍 Polubień i komentarzy
- 🛒 Zakupów online

### Czego NIE mówić AI?

❌ **Nie udostępniaj:**
- Danych osobowych (adres, telefon)
- Numerów kart kredytowych
- Haseł
- Informacji o rodzinie

> 💡 Traktuj AI jak nieznajomego - bądź uprzejmy, ale ostrożny!
    `
  },
  {
    id: 'slide-15',
    part: 4,
    title: 'AI a szkoła',
    description: 'Etyczne wykorzystanie AI w nauce',
    duration: '6 min',
    icon: '🎓',
    content: `
# AI a szkoła 🎓

## Czy można używać AI do odrabiania lekcji?

### ✅ OK:
- Pomoc w zrozumieniu tematu
- Tłumaczenie trudnych słów
- Generowanie pomysłów

### ❌ NIE OK:
- Kopiowanie całych prac
- Oszukiwanie na sprawdzianach
- Podawanie AI za swoje pomysły

> 💡 AI to narzędzie do nauki, nie zastępstwo dla myślenia!
    '
  },

  // CZĘŚĆ V: Co robić, gdy coś się stanie? (16-18)
  {
    id: 'slide-16',
    part: 5,
    title: 'Dla dzieci – Trzy kroki ratunkowe',
    description: 'Co zrobić, gdy poczujesz się niekomfortowo online',
    duration: '5 min',
    icon: '🆘',
    content: '
# Dla dzieci – Trzy kroki ratunkowe 🆘

## Gdy coś pójdzie nie tak:

### Krok 1: STOP ✋
- Przestań robić to, co robisz
- Zamknij aplikację/stronę
- Oddal się od ekranu

### Krok 2: SCREENSHOT 📸
- Zrób zdjęcie ekranu (dowód)
- Zapisz wiadomości
- Zapamiętaj szczegóły

### Krok 3: POWIEDZ 🗣️
- Rodzicowi
- Nauczycielowi
- Innemu dorosłemu, któremu ufasz

> ⚠️ Nigdy nie jesteś winny/winna! Zawsze możesz prosić o pomoc.
    `
  },
  {
    id: 'slide-17',
    part: 5,
    title: 'Dla rodziców – Jak reagować',
    description: 'Instrukcja dla rodziców w sytuacjach kryzysowych',
    duration: '7 min',
    icon: '👨‍👩‍👧',
    content: `
# Dla rodziców – Jak reagować 👨‍👩‍👧

## Gdy dziecko zgłasza problem:

### ✅ CO ROBIĆ:

1. **Wysłuchaj bez osądzania**
2. **Podziękuj za szczerość**
3. **Zachowaj spokój**
4. **Dokumentuj (screenshoty)**
5. **Zgłoś na platformie**
6. **Kontakt ze szkołą/policją** (jeśli poważne)

### ❌ CZEGO NIE ROBIĆ:

- Nie karć dziecka
- Nie zabieraj urządzeń (to kara za szczerość!)
- Nie panikuj
- Nie minimalizuj problemu

> 💬 "Dziękuję, że mi powiedziałeś/aś. To nie twoja wina. Pomogę ci."
    '
  },
  {
    id: 'slide-18',
    part: 5,
    title: 'Gdzie szukać pomocy',
    description: 'Lista numerów alarmowych i organizacji pomocowych',
    duration: '3 min',
    icon: '📞',
    content: '
# Gdzie szukać pomocy 📞

## Numery telefonu:

### 🆘 W nagłych wypadkach:
- **112** – Pogotowie ratunkowe
- **997** – Policja

### 💬 Wsparcie i porady:
- **116 111** – Telefon Zaufania dla Dzieci i Młodzieży
- **800 100 100** – Helpline dla ofiar przemocy w sieci
- **116 000** – Telefon dla zaginionych dzieci

## Strony internetowe:

- **www.fdds.pl** – Fundacja Dajemy Dzieciom Siłę
- **www.sieciaki.pl** – Porady dla dzieci i rodziców
- **www.dyzurnet.pl** – Zgłaszanie nielegalnych treści

> 💙 Zawsze jest ktoś, kto może pomóc!
    `
  },

  // CZĘŚĆ VI: Tworzymy rodzinne zasady (19-20)
  {
    id: 'slide-19',
    part: 6,
    title: 'Warsztat – Rodzinna umowa cyfrowa',
    description: 'Interaktywne tworzenie zasad rodzinnych',
    duration: '10 min',
    icon: '📝',
    content: `
# Warsztat – Rodzinna umowa cyfrowa 📝

## Stwórzcie razem zasady!

### Szablon umowy:

**1. Czas ekranowy:**
- Dni powszednie: ___ godzin
- Weekendy: ___ godzin
- Strefa wolna od ekranów: _______

**2. Bezpieczeństwo:**
- Nie udostępniam: _______
- Prywatne konta: TAK / NIE
- 2FA włączone: TAK / NIE

**3. Komunikacja:**
- Rozmowy o internecie: ___ razy w tygodniu
- Zgłaszanie problemów: BEZ KAR

**4. Konsekwencje:**
- Za złamanie zasad: _______
- Za szczerość: BEZ KONSEKWENCJI

> Podpisy: ___________________
    '
  },
  {
    id: 'slide-20',
    part: 6,
    title: 'Checklist do wydrukowania',
    description: 'Lista kontrolna zasad bezpieczeństwa',
    duration: '5 min',
    icon: '✅',
    content: '
# Checklist do wydrukowania ✅

## Codzienne zasady bezpieczeństwa:

### Dla dzieci:

- ☐ Sprawdziłem/am ustawienia prywatności
- ☐ Nie udostępniłem/am danych osobowych
- ☐ Nie kliknąłem/am w podejrzane linki
- ☐ Zgłosiłem/am niepokojące wiadomości

### Dla rodziców:

- ☐ Porozmawiałem/am z dzieckiem o internecie dzisiaj
- ☐ Sprawdziłem/am ustawienia kontroli rodzicielskiej
- ☐ Zaktualizowałem/am hasła rodzinne
- ☐ Przejrzałem/am aktywność online (z dzieckiem, nie w ukryciu!)

> 📌 Wydrukuj i powieś w widocznym miejscu!
    `
  },

  // CZĘŚĆ VII: Podsumowanie i Q&A (21-24)
  {
    id: 'slide-21',
    part: 7,
    title: '3 najważniejsze rzeczy',
    description: 'Kluczowe wnioski ze szkolenia',
    duration: '3 min',
    icon: '🎯',
    content: `
# 3 najważniejsze rzeczy 🎯

## Zapamiętaj:

### 1. 💬 Rozmowa > Kontrola
Internet to część życia dziecka. Rozmawiaj, a nie zakazuj.

### 2. 🆘 Nigdy nie jesteś sam/sama
Zawsze możesz prosić o pomoc. To NIE jest skarżenie!

### 3. 🔐 Twoje dane = twoja własność
Nie udostępniaj nikomu danych osobowych. Chroniącswoje hasła!

> 💡 Bezpieczeństwo w sieci to podróż, nie cel. Ciągłe uczenie się!
    '
  },
  {
    id: 'slide-22',
    part: 7,
    title: 'Co dalej? – Następne kroki',
    description: 'Dalsze działania po szkoleniu',
    duration: '4 min',
    icon: '🚀',
    content: '
# Co dalej? – Następne kroki 🚀

## Po szkoleniu:

### Dla rodzin:

1. **Dzisiaj:** Stwórzcie rodzinną umowę cyfrową
2. **Ten tydzień:** Przejrzyjcie ustawienia prywatności razem
3. **Ten miesiąc:** Codzienne rozmowy o internecie (5 min)

### Materiały do pobrania:

- 📄 Checklist rodzinny (PDF)
- 📊 Infografika "Jak rozpoznać phishing"
- 📞 Lista numerów alarmowych

### Dalsza nauka:

- **www.sieciaki.pl** - kursy online
- **www.fdds.pl** - webinary dla rodziców

> 🌱 Bezpieczeństwo to proces, nie jednorazowa akcja!
    `
  },
  {
    id: 'slide-23',
    part: 7,
    title: 'Pytania i odpowiedzi',
    description: 'Sesja Q&A z uczestnikami',
    duration: '7 min',
    icon: '❓',
    content: `
# Pytania i odpowiedzi ❓

## Najczęstsze pytania:

### Q: Od jakiego wieku dziecko może mieć social media?
**A:** Większość platform wymaga 13 lat. Ale wiek to nie wszystko - liczy się dojrzałość emocjonalna!

### Q: Czy powinienem/powinnam kontrolować telefon dziecka?
**A:** Przejrzystość > Kontrola. Lepiej mieć wspólną rozmowę niż ukryte sprawdzanie.

### Q: Co zrobić, gdy dziecko odmawia rozmowy o internecie?
**A:** Zacznij małymi krokami. Pytaj o gry/aplikacje bez osądzania.

### Q: Czy AI jest bezpieczne dla dzieci?
**A:** Tak, jeśli używane świadomie. Naucz dziecko, czego nie mówić AI.

> 💬 Macie więcej pytań? Napiszcie w czacie!
    '
  },
  {
    id: 'slide-24',
    part: 7,
    title: 'Dziękuję!',
    description: 'Podziękowania i zakończenie szkolenia',
    duration: '1 min',
    icon: '🙏',
    content: '
# Dziękuję! 🙏

## Dzięki za udział!

Mam nadzieję, że dzisiejsze szkolenie było dla was wartościowe i pomoże wam bezpieczniej poruszać się w cyfrowym świecie.

### Pamiętajcie:

- 💬 **Rozmawiajcie otwarcie**
- 🤝 **Budujcie zaufanie**
- 🆘 **Zawsze możecie prosić o pomoc**

### Kontakt:

📧 Email: kontakt@twoje-szkolenia.pl  
🌐 Strona: www.twoje-szkolenia.pl

### Do zobaczenia!

> 💙 "Internet jest jak ocean - piękny, ale wymaga szacunku i ostrożności."

---

**© 2024 Twoje Szkolenia | Wszystkie prawa zastrzeżone**
    `
  },
];

// Helper function to get slides by part
export function getSlidesByPart(partId: number): Slide[] {
  return slides.filter(slide => slide.part === partId);
}

// Helper function to get slide by id
export function getSlideById(id: string): Slide | undefined {
  return slides.find(slide => slide.id === id);
}

// Helper function to get next slide
export function getNextSlide(currentId: string): Slide | undefined {
  const currentIndex = slides.findIndex(slide => slide.id === currentId);
  return currentIndex !== -1 && currentIndex < slides.length - 1 
    ? slides[currentIndex + 1] 
    : undefined;
}

// Helper function to get previous slide
export function getPreviousSlide(currentId: string): Slide | undefined {
  const currentIndex = slides.findIndex(slide => slide.id === currentId);
  return currentIndex > 0 
    ? slides[currentIndex - 1] 
    : undefined;
}
