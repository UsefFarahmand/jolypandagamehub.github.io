import { playCard } from "../game/turnManager.js";

export function renderGame(gameState){
    renderQueue(gameState);
    renderCurrentTurn(gameState);
    renderHand(gameState);
    renderOtherPlayers(gameState);
    renderParty(gameState);
    renderTrash(gameState);
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

function renderHand(gameState){

    const hand =
        document.getElementById(
            "playerHand"
        );

    hand.innerHTML = "";

    const deckCount =
        document.getElementById("deckCount");


    deckCount.textContent =
        gameState.players[0].deck.length;

    const player =
        gameState.players[0];

    player.hand.forEach(
        (card,index)=>{

            const cardEl =
                createCard(card);

            cardEl.onclick = async ()=>{

                    if(gameState.currentPlayer !== 0)
                        return;

                    await playCard(
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

function renderOtherPlayers(gameState){


    const top =
        document.getElementById("topPlayer");


    const left =
        document.getElementById("leftPlayer");


    const right =
        document.getElementById("rightPlayer");



    top.innerHTML="";
    left.innerHTML="";
    right.innerHTML="";



    const others =
        gameState.players.filter(
            p=>p.id !== "p1"
        );



    const positions=[
        top,
        left,
        right
    ];



    others.forEach((player,i)=>{


        const box =
            positions[i];



        const title =
        `
        <div class="player-label">
            ${player.name}
        </div>
        `;



        let cards="";



        player.hand.forEach(()=>{


            cards +=
            `
            <div 
                class="card-back"
                data-player="${player.id}">
            </div>
            `;


        });



        box.innerHTML =
        title +
        `
        <div class="other-hand">
            ${cards}
        </div>
        `;


    });


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

function createCard(card){

    const div = document.createElement("div");

    div.className = "card";

    div.dataset.player = card.owner.id;

    const visual = card.image
        ? `<img class="card-image" src="${card.image}" alt="${card.name}" />`
        : `<div class="card-emoji">${card.animal}</div>`;

    div.innerHTML = `
        <div class="card-owner-badge">${card.owner.name}</div>
        <div class="card-visual">${visual}</div>
        <div class="card-footer">
            <div class="card-name">${card.name}</div>
            <div class="card-power">${card.power}</div>
        </div>
    `;

    return div;
}



function renderCurrentTurn(gameState){

    const player =
        gameState.players[
            gameState.currentPlayer
        ];

    const turnPlayer =
        document.getElementById(
            "turnPlayer"
        );

    const roundInfo =
        document.getElementById(
            "roundInfo"
        );

    if(turnPlayer){

        turnPlayer.textContent =
            `Turn: ${player.name}`;

    }

    if(roundInfo){

        roundInfo.textContent =
            `Round: ${gameState.round}`;

    }

}