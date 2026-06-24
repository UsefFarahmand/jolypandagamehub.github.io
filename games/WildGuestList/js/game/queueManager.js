import { 
    addLog,
    cardLabel
}
from "../services/logger.js";

export function addToQueue(card, gameState){


    gameState.queue.push(card);


}



export function resolveQueue(gameState){


    if(gameState.queue.length < 5)
        return;



    const first =
        gameState.queue.shift();



    const second =
        gameState.queue.shift();



    const trash =
        gameState.queue.pop();



    first.owner.party.push(first);


    second.owner.party.push(second);


    gameState.trash.push(trash);

    addLog(
        gameState,
        first.owner,
        "logEnteredParty", { card: cardLabel(first) }
    );

    addLog(
        gameState,
        second.owner,
        "logEnteredParty", { card: cardLabel(second) }
    );

    addLog(
        gameState,
        trash.owner,
        "logSentToTrash", { card: cardLabel(trash) }
    );

}

export function resolveRemainingQueue(gameState){

    while(gameState.queue.length > 0){

        if(gameState.queue.length <= 2){

            while(gameState.queue.length > 0){

                const card =
                    gameState.queue.shift();

                card.owner.party.push(card);

            }

        }
        else{

            const first =
                gameState.queue.shift();

            const second =
                gameState.queue.shift();

            first.owner.party.push(first);

            second.owner.party.push(second);

            while(gameState.queue.length > 0){

                const card =
                    gameState.queue.shift();

                gameState.trash.push(card);

            }

        }

    }

}