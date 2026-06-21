import { playCard } from "../game/turnManager.js";

import {
    renderLeaderboard
}
from "./leaderboard-ui.js";

import {
    renderLog
}
from "./log-ui.js";


export function updateUI(gameState){

    renderQueue(gameState);

    renderCurrentTurn(gameState);

    renderLeaderboard(gameState);

    renderLog(gameState);

    renderHand(gameState);

    renderOtherPlayers(gameState);

    renderParty(gameState);

    renderTrash(gameState);

    syncMobilePanels();
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

    const player =
        gameState.players[
            gameState.currentPlayer
        ];

    document.getElementById(
        "turnInfo"
    ).textContent =

        `Turn: ${player.name} | Round: ${gameState.round}`;
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


function createCard(card){

    const div = document.createElement("div");

    div.className = "card";

    div.dataset.player = card.owner.id;

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

function syncMobilePanels(){

    if(window.innerWidth > 900){

        return;
    }
    
    const desktopBoard =
        document.getElementById(
            "leaderboardRows"
        );

    const mobileBoard =
        document.getElementById(
            "mobileLeaderboardContent"
        );

    if(
        desktopBoard &&
        mobileBoard
    ){

        mobileBoard.innerHTML =
            desktopBoard.innerHTML;
    }

    const desktopLog =
        document.getElementById(
            "logEntries"
        );

    const mobileLog =
        document.getElementById(
            "mobileLogContent"
        );

    if(
        desktopLog &&
        mobileLog
    ){

        mobileLog.innerHTML =
            desktopLog.innerHTML;
    }
}