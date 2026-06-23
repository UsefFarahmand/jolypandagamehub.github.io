let tutorialCards = null;

export function initTutorial() {
    const helpBtn   = document.getElementById("helpBtn");
    const helpModal = document.getElementById("helpModal");
    const closeHelp = document.getElementById("closeHelp");
    const cardModal    = document.getElementById("cardModal");
    const cardBackBtn  = document.getElementById("cardBackBtn");

    helpBtn.addEventListener("click", () => {
        helpModal.classList.remove("hidden");
        loadTutorialCards();
    });

    closeHelp.addEventListener("click", () => helpModal.classList.add("hidden"));

    helpModal.addEventListener("click", e => {
        if (e.target === helpModal) helpModal.classList.add("hidden");
    });

    cardBackBtn.addEventListener("click", () => cardModal.classList.add("hidden"));

    cardModal.addEventListener("click", e => {
        if (e.target === cardModal) cardModal.classList.add("hidden");
    });
}

async function loadTutorialCards() {
    if (!tutorialCards) {
        const res = await fetch("./data/cardInfo.json");
        tutorialCards = await res.json();
    }
    renderTutorialCards(tutorialCards);
}

function renderTutorialCards(cards) {
    const grid = document.getElementById("animalGrid");
    grid.innerHTML = "";
    cards.forEach(card => {
        const div = document.createElement("div");
        div.className = "card-info";

        const visual = card.image
            ? `<img class="card-image" src="${card.image}" alt="${card.name}" />`
            : `<div class="tutorial-card-emoji">${card.emoji}</div>`;

        div.innerHTML = `
            ${visual}
            <div class="tutorial-card-footer">
                <div class="tutorial-card-name">${card.name}</div>
                <div class="tutorial-card-power">${card.power}</div>
            </div>
        `;

        div.addEventListener("click", () => openCardInfo(card));
        grid.appendChild(div);
    });
}

function openCardInfo(card) {
    const modal = document.getElementById("cardModal");
    modal.classList.remove("hidden");

    const lines = card.example.split("\n");
    const before = lines[0] || "";
    const after  = lines[1] || "";

    const visual = card.image
        ? `<img src="${card.image}" alt="${card.name}" class="detail-image" />`
        : `<div class="detail-emoji">${card.emoji}</div>`;

    document.getElementById("cardModalContent").innerHTML = `
        <div class="tutorial-card-detail">
            ${visual}
            <h2>${card.name}</h2>
            <div class="power-badge">⚡ Power ${card.power}</div>

            <h3>🎯 How it Works</h3>
            <p class="desc-text">${card.description}</p>

            <h3>📖 Example</h3>
            <div class="example-container">
                <div class="example-box before">
                    <div class="label">Queue Before</div>
                    <div class="text">${before}</div>
                </div>
                <div class="arrow">→</div>
                <div class="example-box after">
                    <div class="label">Queue After</div>
                    <div class="text">${after}</div>
                </div>
            </div>

            <div class="tutorial-tip">
                💡 <strong>Tip:</strong> First 2 cards join their owner's party. Last card goes to trash when the queue reaches 5.
            </div>
        </div>
    `;
}
