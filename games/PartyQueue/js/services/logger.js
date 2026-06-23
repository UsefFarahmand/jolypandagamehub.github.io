export function addLog(
    gameState,
    player,
    text
){

    const log = {

        playerId: player?.id,
        playerName: player?.name,
        text

    };

    console.log(player?.name, text);

    gameState.logs.unshift(log);

    if(gameState.logs.length > 50){

        gameState.logs.pop();

    }

}

export function cardLabel(card){

    return `${card.animal} ${card.name}`;

}