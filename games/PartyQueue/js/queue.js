export function moveCard(queue, card, targetIndex){


    const index =
        queue.indexOf(card);


    if(index === -1)
        return;


    queue.splice(index,1);


    queue.splice(
        targetIndex,
        0,
        card
    );

}