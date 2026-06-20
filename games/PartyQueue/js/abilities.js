export function resolveAbility(card, gameState) {


    switch(card.power) {


        case 12:

            lion(card, gameState);

            break;


        case 11:

            hippo(card, gameState);

            break;


        case 10:

            crocodile(card, gameState);

            break;


        case 9:

            snake(card, gameState);

            break;


        case 8:

            giraffe(card, gameState);

            break;


        case 6:

            seal(card, gameState);

            break;


        case 4:

            parrot(card, gameState);

            break;


        case 3:

            kangaroo(card, gameState);

            break;


        case 2:

            monkey(card, gameState);

            break;


        case 1:

            weasel(card, gameState);

            break;


        default:

            console.log(
                card.name,
                "no ability"
            );

    }


    if(card.power !== 2){

        gameState.lastAbility = card;

    }

}

function kangaroo(card, gameState) {


    const queue =
        gameState.queue;


    const index =
        queue.indexOf(card);


    if(index === -1)
        return;



    const jump =
        Math.floor(Math.random() * 2) + 1;



    const targetIndex =
        index - jump;



    if(targetIndex < 0)
        return;



    console.log(
        "Kangaroo jumped",
        jump,
        "steps"
    );



    queue.splice(index,1);



    queue.splice(
        targetIndex,
        0,
        card
    );

}

function hippo(card, gameState){


    const queue =
        gameState.queue;


    let index =
        queue.indexOf(card);



    while(index > 0){


        const previous =
            queue[index-1];



        // گورخر مانع است
        if(previous.power === 7)
            break;

        if(previous.name === "Sloth Bear"){


            queue[index] =
                previous;


            queue[index-1] =
                card;


            index--;


            continue;

        }

        // فقط از ضعیف‌ترها عبور کند
        if(previous.power < 11){


            queue[index] =
                previous;


            queue[index-1] =
                card;


            index--;

        }
        else{

            break;

        }

    }


    console.log(
        "Hippo moved"
    );

    moveSlothBearBehind(
        card,
        gameState
    );
}

function crocodile(card, gameState){


    const queue =
        gameState.queue;


    let index =
        queue.indexOf(card);



    while(index > 0){


        const previous =
            queue[index-1];



        // گورخر
        if(previous.power === 7)
            break;



        if(previous.power < 10){


            console.log(
                "Crocodile ate",
                previous.name
            );


            queue.splice(
                index-1,
                1
            );


            index--;


        }
        else{


            break;

        }

    }



    // بعد از خوردن‌ها جایگاه را اصلاح کن

    const newIndex =
        queue.indexOf(card);



    if(newIndex > 0){


        const before =
            queue[newIndex-1];


        if(before.power > 10){

            return;

        }

    }



    console.log(
        "Crocodile moved"
    );

}

function snake(card, gameState){


    const queue =
        gameState.queue;



    queue.sort(
        (a,b)=> b.power - a.power
    );



    console.log(
        "Snake sorted the queue"
    );

}

function giraffe(card, gameState){


    const queue =
        gameState.queue;


    let index =
        queue.indexOf(card);



    if(index <= 0)
        return;



    const previous =
        queue[index - 1];


    queue[index] =
        previous;


    queue[index-1] =
        card;



    console.log(
        "Giraffe moved:",
        queue.map(c=>c.name).join(" > ")
    );

}

function seal(card, gameState){


    gameState.queue.reverse();



    console.log(
        "Seal reversed queue:",
        gameState.queue.map(c=>c.name).join(" > ")
    );

}

function lion(card, gameState){


    const queue =
        gameState.queue;



    const otherLion =
        queue.find(
            c =>
            c !== card &&
            c.name==="Lion"
        );


    if(otherLion){

        queue.splice(
            queue.indexOf(card),
            1
        );

        gameState.trash.push(card);

        console.log(
            "Lion blocked"
        );

        return;

    }



    const monkeyIndex =
        queue.findIndex(
            c=>c.name==="Monkey"
        );


    if(monkeyIndex !== -1){


        const monkey =
            queue.splice(
                monkeyIndex,
                1
            )[0];


        gameState.trash.push(monkey);


        console.log(
            "Lion sent Monkey to trash"
        );

    }



    queue.splice(
        queue.indexOf(card),
        1
    );


    queue.unshift(card);



    console.log(
        "Lion moved to front"
    );

    

    moveSlothBearBehind(
        card,
        gameState
    );
}

function monkey(card, gameState){


    const queue =
        gameState.queue;



    const index =
        queue.indexOf(card);


    if(index !== -1){

        queue.splice(index,1);

        queue.push(card);

    }



    const monkeys =
        queue.filter(
            c=>c.name==="Monkey"
        );



    if(monkeys.length < 2){

        console.log(
            "Monkey moved to end"
        );

        return;

    }



    const removed = [];



    for(let i = queue.length - 1; i >= 0; i--){


        if(
            queue[i].name === "Crocodile" ||
            queue[i].name === "Hippo"
        ){

            removed.unshift(
                queue[i]
            );


            queue.splice(i,1);

        }

    }



    if(removed.length > 0){


        queue.unshift(
            ...removed
        );


        console.log(
            "Monkey removed:",
            removed.map(c=>c.name).join(" > ")
        );

    }


}

function weasel(card, gameState){

    const queue = gameState.queue;


    const targets =
        queue
        .filter(c => c !== card)
        .sort((a,b)=> b.power - a.power)
        .slice(0,2);



    targets.forEach(target=>{

        const index =
            queue.indexOf(target);


        if(index !== -1){

            queue.splice(index,1);

            gameState.trash.push(target);


            console.log(
                "Weasel removed",
                target.name
            );
        }

    });


    console.log(
        "Weasel cleaned strongest cards"
    );

}

function parrot(card, gameState){


    const queue =
        gameState.queue;


    const weakCards =
        queue.filter(c =>
            c !== card &&
            c.power < card.power
        );



    if(weakCards.length === 0){

        console.log(
            "Parrot found no weak card"
        );

        return;
    }


    const target =
        weakCards.sort(
            (a,b)=>a.power-b.power
        )[0];



    const index =
        queue.indexOf(target);



    queue.splice(index,1);



    gameState.trash.push(target);



    console.log(
        "Parrot removed",
        target.name
    );

}

function moveSlothBearBehind(card, gameState){


    const queue =
        gameState.queue;



    const cardIndex =
        queue.indexOf(card);



    if(cardIndex === -1)
        return;



    const passedSloths =
        queue.filter(
            (c,index)=>
            c.name === "Sloth Bear" &&
            index > cardIndex
        );



    passedSloths.forEach(sloth=>{


        const index =
            queue.indexOf(sloth);



        queue.splice(
            index,
            1
        );


        queue.splice(
            cardIndex + 1,
            0,
            sloth
        );


    });



    if(passedSloths.length > 0){

        console.log(
            "Sloth Bear followed",
            card.name
        );

    }

}