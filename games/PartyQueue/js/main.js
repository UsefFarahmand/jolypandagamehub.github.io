import {gameState} from "./game/gameState.js";

import {Player} from "./player.js";

import {createDeck,drawCard}
from "./game/deck.js";


import {
startTurn,
playCard
}
from "./game/turnManager.js";

import { updateUI }
from "./ui.js";

import {
    initTutorial
}
from "./game/tutorial.js";

const players=[

new Player(0,"You"),

new Player(1,"Bot 1"),

new Player(2,"Bot 2"),

new Player(3,"Bot 3")

];



gameState.players = players;



players.forEach(p=>{


    p.deck =
    createDeck(p);



    for(let i=0;i<4;i++)
        drawCard(p);


});



updateUI(gameState);

initTutorial();

startTurn(gameState);