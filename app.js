const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".sim-card");
const noResults = document.getElementById("noResults");

let activeFilter = "all";

function normalizeText(text) {
  return text.toLowerCase().trim();
}

function updateCards() {
  const query = normalizeText(searchInput.value);
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardGrade = card.dataset.grade;
    const cardSearch = normalizeText(
      card.dataset.search + " " + card.innerText,
    );

    const matchesSearch = cardSearch.includes(query);
    const matchesFilter = activeFilter === "all" || cardGrade === activeFilter;

    if (matchesSearch && matchesFilter) {
      card.classList.remove("hidden");
      visibleCount++;
    } else {
      card.classList.add("hidden");
    }
  });

  if (visibleCount === 0) {
    noResults.classList.remove("hidden");
  } else {
    noResults.classList.add("hidden");
  }
}

searchInput.addEventListener("input", updateCards);

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    activeFilter = button.dataset.filter;
    updateCards();
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(
    ".sim-card, .intro-card, .benefit-card, .stat-card, .learning-card",
  )
  .forEach((el) => {
    el.classList.add("fade-in");
    observer.observe(el);
  });

function toggleLongDesc() {
  document.getElementById("longDesc").classList.toggle("hidden");
}

function copyShortDesc() {
  const text = `
LoodusLab AI on eestikeelne 7.–12. klassi loodusteaduste simulatsioonide kogumik. Materjal sisaldab 9 interaktiivset simulatsiooni füüsika ja keemia teemadel ning toetab õpetaja tööd ja õpilaste aktiivset õppimist.
  `;
  navigator.clipboard.writeText(text.trim());
  showToast("Lühikirjeldus kopeeritud!");
}

function copyLongDesc() {
  const text = `
LoodusLab AI on Eesti õpetaja loodud veebipõhine simulatsioonide kogumik füüsika ja keemia õppimiseks. Kogumik sisaldab 9 interaktiivset simulatsiooni, õpetaja juhendit, AI kasutamise ideid ja otsingusüsteemi.

Materjal toetab uurimuslikku õpet, aitab visualiseerida keerulisi nähtusi, säästab õpetaja aega ning sobib kasutamiseks klassiruumis, arvutiklassis ja iseseisvaks õppimiseks kodus.

Märksõnad: füüsika, keemia, simulatsioon, AI, STEM, uurimuslik õpe, digitaalne õppematerjal. #TIkonkurss2026
  `;
  navigator.clipboard.writeText(text.trim());
  showToast("Pikk kirjeldus kopeeritud!");
}

function toggleLongDesc() {
  const longDesc = document.getElementById("longDesc");
  const toggleBtn = document.getElementById("toggleLongBtn");

  longDesc.classList.toggle("open");

  if (longDesc.classList.contains("open")) {
    toggleBtn.textContent = "Peida pikem kirjeldus";
  } else {
    toggleBtn.textContent = "Näita pikemat kirjeldust";
  }
}

function copyShortDesc() {
  const text = `LoodusLab AI on eestikeelne 7.–12. klassi loodusteaduste simulatsioonide kogumik. Materjal sisaldab 9 interaktiivset simulatsiooni füüsika ja keemia teemadel ning toetab õpetaja tööd ja õpilaste aktiivset õppimist.`;

  navigator.clipboard.writeText(text);
  showToast("Lühikirjeldus kopeeritud!");
}

function copyLongDesc() {
  const text = `LoodusLab AI on Eesti õpetaja loodud digitaalne õppematerjalide kogumik, mis ühendab interaktiivsed simulatsioonid, õpetaja juhendid ja tehisintellekti toetavad kasutusvõimalused ühele veebiplatvormile.

Kogumik on loodud 7.–12. klassi õpilastele ning toetab põhikooli ja gümnaasiumi loodusteaduste õppekava teemasid. Materjalid sobivad kasutamiseks nii klassiruumis projektoriga, arvutiklassis, tahvliseadmes kui ka iseseisvaks õppimiseks kodus.

Mida kogumik sisaldab?
- 9 interaktiivset simulatsiooni füüsika ja keemia teemadel
- õpetaja juhend kogu kogumikule
- otsing ja klassiastme filtrid
- visuaalsed ekraanipildid lihtsaks valikuks
- ideed AI kasutamiseks õpet toetaval viisil
- valmis kasutamiseks veebis ilma installita

Näited simulatsioonidest:
- pH labor
- Vedeliku rõhk
- Magnetväli
- Elektriväli
- Ringliikumise dünaamika
- Harmooniline võnkumine
- Ampère’i seadus
- Kolvisüsteem
- Päikesepaneelide mudel

Kuidas see aitab õpetajat?
Materjal on loodud eesmärgiga vähendada õpetaja töökoormust.

Õpetaja saab:
- leida kiiresti sobiva simulatsiooni tunni teemaks
- kasutada valmis visuaale nähtuste selgitamiseks
- anda õpilastele uurimuslikke ülesandeid
- kasutada juhendis toodud küsimusi ja tööideid
- rakendada AI-promptide näiteid tagasisideks ja diferentseerimiseks

Kuidas see aitab õpilast?
Õpilane saab:
- uurida nähtusi ise suurusi muutes
- mõista seoseid valemi, nähtuse ja graafiku vahel
- teha järeldusi katsetulemuste põhjal
- õppida aktiivselt, mitte ainult passiivselt lugedes
- kasutada AI-d mõistmise toetamiseks

Tehnilised eelised:
- töötab brauseris
- ei vaja kontot ega paigaldust
- sobib arvutisse, tahvlisse ja telefoni
- eestikeelne kasutajaliides
- tasuta kasutatav

Miks see on oluline?
Paljud kvaliteetsed loodusteaduste simulatsioonid on ingliskeelsed või ei arvesta Eesti õppekava vajadustega. LoodusLab AI pakub eestikeelset, õpetaja loodud ja praktiliselt kasutatavat alternatiivi.

Märksõnad:
füüsika, keemia, simulatsioon, interaktiivne õpe, AI, tehisintellekt, õpetaja töö lihtsustamine, uurimuslik õpe, gümnaasium, põhikool, STEM, digitaalne õppematerjal

Konkursi märksõna:
#TIkonkurss2026`;

  navigator.clipboard.writeText(text);
  alert("Pikk kirjeldus kopeeritud!");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2200);
}
