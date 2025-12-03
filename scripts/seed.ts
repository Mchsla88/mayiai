
import { PrismaClient, UserRole, SubscriptionStatus, SubscriptionType } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Create default admin user (hidden from user)
  const hashedPassword = await bcrypt.hash('johndoe123', 12);
  const adminUser = await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: hashedPassword,
      firstName: 'John',
      lastName: 'Doe',
      name: 'John Doe',
      role: UserRole.ADMIN,
      isAdmin: true,
      companyName: 'Admin Company'
    },
  });

  console.log('✅ Admin user created:', adminUser.email);

  // Create sample ebook chapters
  const chapters = [
    {
      title: 'Wprowadzenie do Konsultingu Strategicznego',
      slug: 'wprowadzenie-do-konsultingu-strategicznego',
      content: `
# Wprowadzenie do Konsultingu Strategicznego

Konsulting strategiczny to kluczowy element rozwoju każdej firmy w dzisiejszym dynamicznym środowisku biznesowym. W tym rozdziale poznasz fundamenty strategicznego myślenia i planowania.

## Co to jest strategia biznesowa?

Strategia biznesowa to długoterminowy plan działania, który definiuje kierunek rozwoju firmy oraz sposób osiągnięcia jej celów. Obejmuje ona:

- **Analizę rynku** i pozycji konkurencyjnej
- **Identyfikację przewag** konkurencyjnych
- **Planowanie zasobów** i inwestycji
- **Zarządzanie ryzykiem** biznesowym

## Kiedy potrzebujesz konsultanta strategicznego?

Wiele firm boryka się z wyzwaniami, które wymagają zewnętrznej ekspertyzy:

1. **Stagnacja wzrostu** - przychody nie rosną mimo inwestycji
2. **Presja konkurencyjna** - tracisz udział w rynku
3. **Transformacja cyfrowa** - potrzebujesz modernizacji procesów
4. **Ekspansja międzynarodowa** - planujesz wejście na nowe rynki
5. **Fuzje i przejęcia** - potrzebujesz strategicznej oceny

## Korzyści z profesjonalnego doradztwa

Współpraca z doświadczonym konsultantem strategicznym przynosi wymierne korzyści:

- **Obiektywna ocena** sytuacji biznesowej
- **Dostęp do najlepszych praktyk** z branży
- **Akceleracja procesów** decyzyjnych
- **Wsparcie w implementacji** zmian

W kolejnych rozdziałach poznasz szczegółowe metodologie i narzędzia strategiczne.
      `,
      excerpt: 'Podstawy konsultingu strategicznego i jego znaczenie dla rozwoju firmy',
      orderIndex: 1,
      estimatedReadTime: 8
    },
    {
      title: 'Analiza Strategiczna i Diagnostyka',
      slug: 'analiza-strategiczna-i-diagnostyka',
      content: `
# Analiza Strategiczna i Diagnostyka

Prawidłowa diagnoza to fundament każdej skutecznej strategii. W tym rozdziale poznasz kluczowe narzędzia analizy strategicznej.

## Analiza SWOT

Analiza SWOT to podstawowe narzędzie strategiczne pozwalające na kompleksową ocenę sytuacji firmy:

### Mocne strony (Strengths)
- Unikalne kompetencje
- Przewagi konkurencyjne  
- Zasoby i aktywa
- Reputacja marki

### Słabe strony (Weaknesses)
- Brak kompetencji
- Ograniczone zasoby
- Słaba pozycja rynkowa
- Problemy operacyjne

### Szanse (Opportunities)
- Trendy rynkowe
- Nowe technologie
- Zmiany regulacyjne
- Potrzeby klientów

### Zagrożenia (Threats)
- Konkurencja
- Bariery regulacyjne
- Zmiany technologiczne
- Ryzyko ekonomiczne

## Analiza Portera 5 Sił

Model Portera pomaga ocenić atrakcyjność branży:

1. **Siła przetargowa dostawców**
2. **Siła przetargowa nabywców**  
3. **Zagrożenie nowymi uczestnikami**
4. **Zagrożenie substytutami**
5. **Rivalisation wśród konkurentów**

## Macierz BCG

Narzędzie do analizy portfolio produktów/usług według dwóch wymiarów:
- **Tempo wzrostu rynku**
- **Udział w rynku**

Pozwala na kategoryzację na: Gwiazdy, Dojne Krowy, Znaki Zapytania, Psy.

## Praktyczne zastosowanie

Każde z tych narzędzi wymaga systematycznego podejścia i regularnej aktualizacji analiz.
      `,
      excerpt: 'Kluczowe narzędzia analizy strategicznej: SWOT, Porter 5 Forces, BCG',
      orderIndex: 2,
      estimatedReadTime: 12
    },
    {
      title: 'Transformacja Cyfrowa w Strategii',
      slug: 'transformacja-cyfrowa-w-strategii',
      content: `
# Transformacja Cyfrowa w Strategii

Cyfryzacja to już nie opcja, ale konieczność w dzisiejszym biznesie. Ten rozdział pokazuje, jak strategicznie podejść do transformacji cyfrowej.

## Definicja i zakres

Transformacja cyfrowa to kompleksowe wykorzystanie technologii cyfrowych do fundamentalnej zmiany sposobu działania firmy i dostarczania wartości klientom.

### Kluczowe obszary transformacji:

1. **Procesy biznesowe**
   - Automatyzacja rutynowych zadań
   - Optymalizacja przepływów pracy
   - Integracja systemów

2. **Doświadczenie klienta**
   - Personalizacja oferty
   - Kanały cyfrowe
   - Analityka behawioralna

3. **Model biznesowy**
   - Nowe źródła przychodów
   - Platformizacja
   - Ekonomia subskrypcyjna

4. **Kultura organizacyjna**
   - Myślenie agile
   - Data-driven decisions
   - Ciągłe uczenie się

## Etapy implementacji

### Faza 1: Ocena dojrzałości cyfrowej
- Audit obecnych systemów
- Identyfikacja luk
- Benchmarking z konkurencją

### Faza 2: Strategia cyfrowa
- Definiowanie celów
- Wybór technologii
- Plan implementacji

### Faza 3: Wykonanie
- Pilotażowe projekty
- Skalowanie rozwiązań
- Change management

### Faza 4: Optymalizacja
- Monitoring KPI
- Continuous improvement
- Adaptacja strategii

## ROI i metryki sukcesu

Kluczowe wskaźniki transformacji cyfrowej:
- Wzrost produktywności (20-30%)
- Redukcja kosztów operacyjnych (15-25%)
- Poprawa satysfakcji klientów
- Skrócenie time-to-market

## Wyzwania i bariery

- Opór wobec zmian
- Niedobór kompetencji cyfrowych
- Ograniczenia budżetowe
- Kwestie bezpieczeństwa

Transformacja cyfrowa wymaga holistycznego podejścia i silnego przywództwa.
      `,
      excerpt: 'Jak strategicznie podejść do transformacji cyfrowej i osiągnąć mierzalne rezultaty',
      orderIndex: 3,
      estimatedReadTime: 15
    },
    {
      title: 'Strategie Wzrostu i Ekspansji',
      slug: 'strategie-wzrostu-i-ekspansji',
      content: `
# Strategie Wzrostu i Ekspansji

Trwały wzrost to cel każdej firmy. W tym rozdziale poznasz sprawdzone strategie ekspansji i skalowania biznesu.

## Macierz Ansoffa - opcje strategiczne

### 1. Penetracja rynku
**Cel:** Zwiększenie sprzedaży obecnych produktów na obecnym rynku
- Intensyfikacja marketingu
- Optymalizacja cen
- Poprawa dystrybucji
- Program lojalnościowy

### 2. Rozwój produktu
**Cel:** Wprowadzenie nowych produktów na obecny rynek
- Innowacje produktowe
- Rozszerzenie linii
- Ulepszenia jakościowe
- Produkty komplementarne

### 3. Rozwój rynku
**Cel:** Sprzedaż obecnych produktów na nowych rynkach
- Ekspansja geograficzna
- Nowe segmenty klientów
- Nowe kanały dystrybucji
- Repositioning marki

### 4. Dywersyfikacja
**Cel:** Nowe produkty na nowych rynkach
- Dywersyfikacja powiązana
- Dywersyfikacja niepowiązana
- Integracja pionowa
- Konglomeryzacja

## Strategie konkurencyjne

### Przywództwo kosztowe
- Optymalizacja procesów
- Ekonomia skali
- Efektywne procurement
- Lean management

### Różnicowanie
- Unikalna wartość dla klienta
- Premium pricing
- Innowacyjność
- Jakość produktu/usługi

### Fokus (nisze)
- Specjalizacja w segmencie
- Głęboka znajomość klientów
- Customizacja oferty
- Bliska relacja z rynkiem

## Ekspansja międzynarodowa

### Kryteria oceny rynków:
1. **Wielkość i potencjał rynku**
2. **Bariery wejścia**
3. **Konkurencyjność**
4. **Ryzyko polityczne i ekonomiczne**
5. **Różnice kulturowe**

### Sposoby wejścia:
- Export bezpośredni/pośredni
- Licensing/Franchising
- Joint venture
- Bezpośrednie inwestycje

## Finansowanie wzrostu

### Źródła finansowania:
- Reinwestycja zysków
- Kredyty bankowe
- Private equity/VC
- Emisja akcji
- Obligacje korporacyjne
- Crowdfunding

## Kluczowe wskaźniki wzrostu

- CAGR (złożona roczna stopa wzrostu)
- Market share evolution
- Customer acquisition cost (CAC)
- Lifetime value (LTV)
- Return on invested capital (ROIC)

## Zarządzanie ryzykiem wzrostu

- Dywersyfikacja portfolio
- Stress testing scenarios
- Systemy wczesnego ostrzegania
- Planowanie scenariuszy
- Elastyczność strategii

Wzrost musi być zrównoważony i oparty na solidnych fundamentach biznesowych.
      `,
      excerpt: 'Strategie wzrostu, ekspansji międzynarodowej i skalowania biznesu',
      orderIndex: 4,
      estimatedReadTime: 18
    },
    {
      title: 'Implementacja i Change Management',
      slug: 'implementacja-i-change-management',
      content: `
# Implementacja i Change Management

Najlepsza strategia to ta, która zostanie skutecznie wdrożona. Ten rozdział pokazuje, jak przekuć plany w rzeczywiste rezultaty.

## Planowanie implementacji

### Framework implementacji strategii

1. **Decomposition** - rozbicie strategii na konkretne projekty
2. **Prioritization** - ustalenie kolejności działań
3. **Resource allocation** - przydzielenie zasobów
4. **Timeline creation** - harmonogram działań
5. **Governance setup** - struktura nadzoru

### Kluczowe elementy planu:
- **Milestones** - kluczowe punkty kontrolne
- **Deliverables** - konkretne rezultaty
- **Dependencies** - zależności między zadaniami
- **Risk mitigation** - plan zarządzania ryzykiem
- **Communication plan** - strategia komunikacji

## Zarządzanie zmianą

### Model Kottera (8 kroków)
1. **Poczucie pilności** - budowanie świadomości potrzeby zmian
2. **Koalicja przywódców** - zespół sponsorów zmiany
3. **Wizja zmiany** - jasny obraz przyszłości
4. **Komunikacja wizji** - szeroko zakrojona edukacja
5. **Upełnomocnienie** - usuwanie barier
6. **Szybkie zwycięstwa** - generowanie momentum
7. **Konsolidacja** - pogłębianie zmian
8. **Zakorzenienie** - trwałe osadzenie w kulturze

### Bariery implementacji

#### Bariery organizacyjne:
- Silosy funkcjonalne
- Brak zasobów
- Konflikty priorytetów
- Słaba komunikacja

#### Bariery kulturowe:
- Opór wobec zmian
- Brak kompetencji
- Konflikt wartości
- Przyzwyczajenia

#### Bariery strategiczne:
- Niejasna strategia
- Brak buy-in leadership
- Słabe metryki
- Nieadekwatne systemy

### Przezwyciężanie oporu

1. **Edukacja i komunikacja**
   - Wyjaśnienie potrzeby zmian
   - Korzyści dla uczestników
   - Regularne updates

2. **Partycypacja i zaangażowanie**
   - Włączenie w planowanie
   - Zbieranie feedback
   - Co-creation process

3. **Wsparcie i ułatwienia**
   - Training programs
   - Coaching
   - Narzędzia i systemy

4. **Negocjacja i porozumienie**
   - Kompromisy
   - Incentives
   - Win-win solutions

## Governance i monitoring

### Struktura zarządzania projektami strategicznymi:
- **Steering Committee** - nadzór strategiczny
- **Project Management Office (PMO)** - koordynacja
- **Work streams** - zespoły wykonawcze
- **Communication network** - sieć informacyjna

### System monitoringu:
- **KPI dashboards** - kluczowe wskaźniki
- **Regular reviews** - cykliczne przeglądy
- **Milestone tracking** - śledzenie kamieni milowych
- **Risk monitoring** - zarządzanie ryzykiem
- **Financial tracking** - kontrola budżetu

## Kultura wykonania

### Charakterystyki organizacji zorientowanej na wykonanie:
- **Clarity** - jasność celów i ról
- **Accountability** - odpowiedzialność za rezultaty
- **Discipline** - dyscyplina w działaniu
- **Agility** - zdolność adaptacji
- **Learning** - ciągłe doskonalenie

### Narzędzia wspierające wykonanie:
- OKRs (Objectives and Key Results)
- Balanced Scorecard
- Performance contracts
- Regular pulse surveys
- Action learning sets

Implementacja strategii wymaga równie dużej uwagi co jej formułowanie - to tutaj rozstrzyga się sukces lub porażka.
      `,
      excerpt: 'Skuteczna implementacja strategii i zarządzanie zmianą organizacyjną',
      orderIndex: 5,
      estimatedReadTime: 20
    },
    {
      title: 'Monitoring i Optymalizacja Strategii',
      slug: 'monitoring-i-optymalizacja-strategii',
      content: `
# Monitoring i Optymalizacja Strategii

Strategia to żywy dokument, który wymaga ciągłego monitoringu i dostosowywania do zmieniających się warunków.

## System pomiaru skuteczności

### Balanced Scorecard
Holistyczne podejście do pomiaru performance w czterech perspektywach:

1. **Perspektywa finansowa**
   - ROI, ROE, ROIC
   - Revenue growth
   - Cost management
   - Cash flow

2. **Perspektywa klienta**
   - Customer satisfaction
   - Net Promoter Score (NPS)
   - Customer retention
   - Market share

3. **Perspektywa procesów wewnętrznych**
   - Operational efficiency
   - Quality metrics
   - Innovation rate
   - Time to market

4. **Perspektywa uczenia się i rozwoju**
   - Employee engagement
   - Skills development
   - Leadership pipeline
   - Knowledge management

### OKRs (Objectives and Key Results)
Metodologia Google'a dla alignment i focus:
- **Objectives** - jakościowe cele aspiracyjne
- **Key Results** - mierzalne rezultaty
- **Quarterly cycles** - krótkie cykle planistyczne
- **Transparency** - otwartość na wszystkich poziomach

## Dashboard strategiczny

### Kluczowe komponenty:
1. **Executive summary** - podsumowanie dla zarządu
2. **Financial performance** - wyniki finansowe
3. **Strategic initiatives** - postęp projektów strategicznych
4. **Market intelligence** - analiza otoczenia
5. **Risk indicators** - wskaźniki ryzyka

### Częstotliwość raportowania:
- **Daily** - operacyjne KPI (sprzedaż, produkcja)
- **Weekly** - projekty strategiczne, finanse
- **Monthly** - comprehensive business review
- **Quarterly** - strategic assessment
- **Annually** - strategic planning cycle

## Analiza odchyleń

### Metodologia root cause analysis:
1. **Identify the gap** - zidentyfikuj różnicę między planem a rzeczywistością
2. **Drill down** - pogłęb analizę przyczyn
3. **5 Whys technique** - zadawaj pytanie "dlaczego?" 5 razy
4. **Fishbone diagram** - analiza przyczynowo-skutkowa
5. **Action planning** - plan działań korygujących

### Typy odchyleń:
- **Volume variance** - odchylenia wolumenu
- **Price variance** - odchylenia cenowe  
- **Mix variance** - odchylenia struktury
- **Efficiency variance** - odchylenia efektywności

## Adaptacja strategii

### Sygnały do zmiany strategii:
1. **Persistent underperformance** - ciągłe niedociągnięcia
2. **Market disruption** - zakłócenia rynkowe
3. **Competitive threats** - zagrożenia konkurencyjne
4. **Technology shifts** - zmiany technologiczne
5. **Regulatory changes** - zmiany regulacyjne

### Proces adaptacji:
1. **Environmental scanning** - skanowanie otoczenia
2. **Strategic assessment** - ocena strategiczna
3. **Options generation** - generowanie opcji
4. **Impact analysis** - analiza skutków
5. **Decision making** - podejmowanie decyzji
6. **Implementation** - wdrożenie zmian

## Strategiczne przeglądy

### Quarterly Business Reviews (QBR):
- Performance vs targets
- Market developments
- Competitive landscape
- Strategic initiative progress
- Resource reallocation
- Risk assessment

### Annual Strategic Planning:
- External environment analysis
- Internal capability assessment
- Strategic option evaluation
- Resource planning
- Target setting
- Implementation planning

## Kultura ciągłego doskonalenia

### Zasady:
- **Experimentation mindset** - mentalność eksperymentu
- **Fail fast, learn faster** - szybko zawieść, szybciej się uczyć
- **Data-driven decisions** - decyzje oparte na danych
- **Cross-functional collaboration** - współpraca międzyfunkcyjna
- **External orientation** - orientacja na otoczenie

### Narzędzia:
- Plan-Do-Check-Act (PDCA)
- Kaizen events
- Innovation labs
- Strategic scenario planning
- War gaming exercises

Skuteczny monitoring i optymalizacja strategii wymagają zarówno sztywnej dyscypliny pomiarowej, jak i elastyczności w adaptacji do zmieniających się warunków.
      `,
      excerpt: 'System monitoringu strategii, KPI, dashboardy i proces ciągłej optymalizacji',
      orderIndex: 6,
      estimatedReadTime: 16
    }
  ];

  // Create ebook chapters
  for (const chapter of chapters) {
    await prisma.ebookChapter.upsert({
      where: { slug: chapter.slug },
      update: {},
      create: chapter,
    });
  }

  console.log(`✅ Created ${chapters.length} ebook chapters`);

  // Create sample contact form submission
  await prisma.contactFormSubmission.create({
    data: {
      name: 'Anna Kowalska',
      email: 'anna.kowalska@example.com',
      companyName: 'Tech Solutions Sp. z o.o.',

      subject: 'Konsultacja strategiczna',
      message: 'Dzień dobry, interesuje mnie konsultacja w zakresie transformacji cyfrowej naszej firmy. Czy moglibyśmy umówić się na rozmowę?',
      formType: 'CONSULTATION_REQUEST',
      status: 'NEW'
    }
  });

  console.log('✅ Sample data created');
  console.log('🎉 Database seeded successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
