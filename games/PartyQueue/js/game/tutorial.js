let tutorialCards = null;

export function initTutorial(){

    const cardModal =
        document.getElementById("cardModal");

    const cardBackBtn =
        document.getElementById("cardBackBtn");

    const helpBtn =
        document.getElementById("helpBtn");

    const helpModal =
        document.getElementById("helpModal");

    const closeHelp =
        document.getElementById("closeHelp");

    helpBtn.addEventListener("click",()=>{

        helpModal.classList.remove("hidden");

        loadTutorialCards();

    });

    closeHelp.addEventListener("click",()=>{

        helpModal.classList.add("hidden");

    });

    cardBackBtn.addEventListener("click",()=>{

        cardModal.classList.add("hidden");

    });

    cardModal.addEventListener("click",(e)=>{

    if(e.target === cardModal){

        cardModal.classList.add("hidden");

    }

    });

    helpModal.addEventListener("click",(e)=>{

        if(e.target === helpModal){

            helpModal.classList.add("hidden");

        }

    });
}

async function loadTutorialCards(){

    if(!tutorialCards){

        const response =
            await fetch("./data/cardInfo.json");

        tutorialCards =
            await response.json();
    }

    renderTutorialCards(
        tutorialCards
    );
}

function renderTutorialCards(cards){

    const grid =
        document.getElementById(
            "animalGrid"
        );

    grid.innerHTML = "";

    cards.forEach(card=>{

        const div =
            document.createElement("div");

        div.className =
            "card-info";

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

        div.addEventListener(
            "click",
            ()=>openCardInfo(card)
        );

        grid.appendChild(div);

    });

}

function openCardInfo(card){

    const modal = document.getElementById("cardModal");
    modal.classList.remove("hidden");

    const [before, after] = card.example.split("\n");

    const detailVisual = card.image
        ? `<img class="detail-image" src="${card.image}" alt="${card.name}" style="width:100px;height:100px;object-fit:contain;margin-bottom:10px;" />`
        : `<div class="detail-emoji">${card.emoji}</div>`;

    document.getElementById("cardModalContent").innerHTML = `
        <div class="tutorial-card-detail">

            ${detailVisual}
            <h2>${card.name}</h2>

            <div class="power-badge">
                Power ${card.power}
            </div>

            <h3>Description</h3>
            <p class="desc-text">${card.description}</p>

            <h3>Example</h3>

            <div class="example-container">

                <div class="example-box before">
                    <div class="label">Before</div>
                    <div class="text">${before}</div>
                </div>

                <div class="arrow">→</div>

                <div class="example-box after">
                    <div class="label">After</div>
                    <div class="text">${after}</div>
                </div>

            </div>

        </div>
    `;
}