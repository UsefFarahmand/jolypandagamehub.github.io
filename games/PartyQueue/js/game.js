import { CARDS } from "./cards.js";
import { Player } from "./player.js";
import { getRandomCardIndex } from "./ai.js";
import { resolveAbility } from "./abilities.js";

function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function createDeck(player) {

    const deck = [];

    for(let i = 1; i <= 12; i++) {

        const card = structuredClone(CARDS[i]);

        card.owner = player;

        deck.push(card);
    }

    return shuffle(deck);
}

function drawCards(player, amount = 1) {

    for (let i = 0; i < amount; i++) {

        if (player.deck.length === 0)
            return;

        player.hand.push(
            player.deck.shift()
        );
    }
}

function drawCard(player) {

    if (player.deck.length === 0)
        return;

    if (player.hand.length >= 4)
        return;

    player.hand.push(
        player.deck.shift()
    );
}

const players = [

    new Player(0, "You"),

    new Player(1, "Bot 1"),

    new Player(2, "Bot 2"),

    new Player(3, "Bot 3")
];

players.forEach(player => {

    player.deck = createDeck(player);

    drawCards(player, 4);
});

const gameState = {

    players,

    queue: [],

    trash: [],

    entranceAtStart: true,

    currentPlayer: 0,

    round: 1,

    lastAbility: null

};

function playCard(player, cardIndex) {

    const card = player.hand.splice(cardIndex, 1)[0];

    gameState.queue.push(card);

    console.log(
        player.name,
        "played",
        card.name
    );
}

function resolveQueue(){

    if(gameState.queue.length < 5)
        return;


    console.log("=== RESOLVE QUEUE ===");


    logQueue("START");


    const firstCard =
        takeFromEntrance();


    const secondCard =
        takeFromEntrance();


    const lastCard =
        takeFromTrashSide();



    console.log(
        "Party:",
        firstCard.name,
        "->",
        firstCard.owner.name
    );


    firstCard.owner.party.push(firstCard);



    console.log(
        "Party:",
        secondCard.name,
        "->",
        secondCard.owner.name
    );


    secondCard.owner.party.push(secondCard);



    console.log(
        "Trash:",
        lastCard.name
    );


    gameState.trash.push(lastCard);



    logQueue("END");


    console.log("====================");

}

function takeFromEntrance(){

    return gameState.queue.shift();

}

function takeFromTrashSide(){

    return gameState.queue.pop();

}

function takeTurn(player) {

    if(player.hand.length === 0)
        return;

    //const cardIndex =
    //    getRandomCardIndex(player);

    const cardIndex =
        //player.hand.findIndex(c => c.power === 9);
        getRandomCardIndex(player);

    playCard(player, cardIndex);

    endTurn(player);
}

function nextPlayer() {

    gameState.currentPlayer++;

    if(
        gameState.currentPlayer >=
        gameState.players.length
    ) {

        gameState.currentPlayer = 0;

        gameState.round++;
    }

}

function runGame() {

    while(!isGameOver()) {

        const player =
            gameState.players[
                gameState.currentPlayer
            ];

        takeTurn(player);

        nextPlayer();
    }

    resolveRemainingQueue();
    finishGame();
}

function endTurn(player) {


    const lastCard =
        gameState.queue[
            gameState.queue.length - 1
        ];


    logQueue("QUEUE BEFORE ABILITY:");

    
    resolveAbility(
        lastCard,
        gameState
    );


    logQueue("QUEUE AFTER ABILITY:");



    resolveQueue();


    logQueue("QUEUE AFTER RESOLVE:");



    drawCard(player);


    printFullState();

}

function finishGame() {

    let winner = null;

    let bestPartyCount = -1;

    let bestPower = -1;

    gameState.players.forEach(player => {

        const partyCount =
            player.party.length;

        const powerSum =
            player.party.reduce(
                (sum, card) => sum + card.power,
                0
            );

        if(
            partyCount > bestPartyCount
        ) {

            winner = player;

            bestPartyCount =
                partyCount;

            bestPower =
                powerSum;
        }
        else if(
            partyCount === bestPartyCount &&
            powerSum > bestPower
        ) {

            winner = player;

            bestPower =
                powerSum;
        }

    });

    console.log("GAME OVER");

    console.log(
        "Winner:",
        winner.name
    );
}

function isGameOver() {

    return gameState.players.every(player =>
        player.deck.length === 0 &&
        player.hand.length === 0
    );

}

function resolveRemainingQueue() {

    while(gameState.queue.length > 0) {

        if(gameState.queue.length <= 2) {

            // همه وارد مهمانی می‌شوند
            while(gameState.queue.length > 0) {

                const card = gameState.queue.shift();

                card.owner.party.push(card);
            }

        }
        else {

            // دو کارت اول مهمانی
            const first =
                gameState.queue.shift();

            const second =
                gameState.queue.shift();


            const firstOwner =
                first.owner;

            const secondOwner =
                second.owner;


            firstOwner.party.push(first);

            secondOwner.party.push(second);


            // باقی کارت‌ها حذف می‌شوند
            while(gameState.queue.length > 0) {

                gameState.trash.push(
                    gameState.queue.shift()
                );

            }

        }

    }

}

runGame();

// TEST
function printFullState(){

    console.log(
        `Round ${gameState.round}`
    );


    console.log(
        "Queue:",
        gameState.queue
        .map(c=>c.name)
        .join(" > ")
    );


    gameState.players.forEach(p=>{

        console.log(
            `${p.name}: Hand ${p.hand.length} | Party ${p.party.length}`
        );

    });

}

function printState() {

    console.log("==========");

    console.log("QUEUE");

    console.log(
        gameState.queue.map(c => c.name)
    );

    console.log("TRASH");

    console.log(
        gameState.trash.map(c => c.name)
    );

    players.forEach(player => {

        console.log(
            player.name,
            "Hand:",
            player.hand.length,
            "Party:",
            player.party.length
        );

    });

    console.log("==========");
}

function logQueue(title){

    console.log(
        title,
        gameState.queue
        .map(card => card.name)
        .join(" > ")
    );

}