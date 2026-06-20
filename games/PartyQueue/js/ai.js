export function getRandomCardIndex(player) {

    return Math.floor(
        Math.random() * player.hand.length
    );

}