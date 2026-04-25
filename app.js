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
