import { playCard } from "./game/turnManager.js";

export function updateUI(gameState){

    renderQueue(gameState);

    renderPlayers(gameState);

    renderHand(gameState);

    renderCurrentTurn(gameState);

    renderParty(gameState);

    renderTrash(gameState);

    renderScores(gameState);
}

function renderQueue(gameState){

    const queue =
        document.getElementById("queue");

    queue.innerHTML = "";

    for(let i=0;i<5;i++){

        const slot =
            document.createElement("div");

        slot.className =
            "queue-slot";

        if(gameState.queue[i]){

            slot.appendChild(
                createCard(
                    gameState.queue[i]
                )
            );

        }

        queue.appendChild(slot);

    }

}

function renderCurrentTurn(gameState){

    document.getElementById(
        "currentTurn"
    ).textContent =

        `Turn: ${
            gameState.players[
                gameState.currentPlayer
            ].name
        }`;

}

function renderHand(gameState){

    const hand =
        document.getElementById(
            "playerHand"
        );

    hand.innerHTML = "";


    const player =
        gameState.players[0];

        console.log(
        "PLAYER HAND:",
        player.hand
    );

    player.hand.forEach(
        (card,index)=>{

            const cardEl =
                createCard(card);

            cardEl.onclick=()=>{

                playCard(
                    player,
                    index,
                    gameState
                );

            };

            hand.appendChild(
                cardEl
            );

        }
    );

}

function renderScores(gameState){

    const score =
        document.getElementById(
            "scores"
        );

    score.innerHTML = "";

    gameState.players.forEach(player=>{

        const power =
            player.party.reduce(
                (sum,c)=>
                sum + c.power,
                0
            );

        score.innerHTML += `

            <div>

                ${player.name}

                |
                Party:
                ${player.party.length}

                |
                Power:
                ${power}

            </div>

        `;

    });

}

function renderPlayers(gameState){

    for(let i=1;i<4;i++){

        const player =
            gameState.players[i];

        const div =
            document.getElementById(
                `bot${i}`
            );

        div.innerHTML = `

            <h3>${player.name}</h3>

            Hand: ${player.hand.length}
            <br>

            Party: ${player.party.length}

        `;
    }
}

function createCard(card){

    const div =
        document.createElement("div");

    div.className = "card";

    div.innerHTML = `

        <div class="animal">
            ${card.animal}
        </div>

        <div class="name">
            ${card.name}
        </div>

        <div class="power">
            ${card.power}
        </div>

        <div class="owner">
            ${card.owner.name}
        </div>

    `;

    return div;
}

function renderParty(gameState){

    const party =
        document.getElementById(
            "partyCards"
        );

    party.innerHTML = "";

    gameState.players.forEach(player=>{

        player.party.forEach(card=>{

            party.appendChild(
                createCard(card)
            );

        });

    });

}

function renderTrash(gameState){

    const trash =
        document.getElementById(
            "trashCards"
        );

    trash.innerHTML = "";

    gameState.trash.forEach(card=>{

        trash.appendChild(
            createCard(card)
        );

    });

}

function renderScoreboard(gameState){

    const board =
        document.getElementById(
            "scoreboard"
        );

    board.innerHTML =
        gameState.players.map(p=>{

            const score =
                p.party.reduce(
                    (sum,c)=>
                    sum+c.power,
                    0
                );

            return `
                ${p.name}
                :
                ${score}
            `;

        }).join(" | ");

}