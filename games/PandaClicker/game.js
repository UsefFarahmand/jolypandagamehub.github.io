let bamboo = 0;

let power = 1;

let upgradeCost = 20;



const panda =
document.getElementById("panda");


const score =
document.getElementById("score");


const powerText =
document.getElementById("power");


const cost =
document.getElementById("cost");


const upgrade =
document.getElementById("upgrade");


const sound =
document.getElementById("clickSound");


const particles =
document.getElementById("particles");



const menu =
document.getElementById("menu");


const game =
document.querySelector(".game");


const start =
document.getElementById("start");



start.onclick = ()=>{

    menu.style.display = "none";

    game.classList.remove("hidden");

};


const backHub = document.getElementById("backHub");

backHub.onclick = () => {

    window.location.href = "../../index.html";

};

const exitGame = document.getElementById("exitGame");


exitGame.onclick = () => {

    window.location.href = "index.html";

};

if(localStorage.bamboo){

bamboo =
Number(localStorage.bamboo);

}




function updateUI(){


score.innerText=bamboo;


powerText.innerText=power;


cost.innerText=upgradeCost;


}



function createParticle(){


let p =
document.createElement("span");


p.innerText =
"+" + power + " 🎋";



p.style.left =
Math.random()*150+"px";


p.style.top="80px";



particles.appendChild(p);



setTimeout(()=>{


p.remove();


},1000);


}





panda.onclick=()=>{


bamboo += power;


localStorage.bamboo=bamboo;


createParticle();


sound.currentTime=0;

sound.play();


updateUI();



};





upgrade.onclick=()=>{


if(bamboo>=upgradeCost){


bamboo-=upgradeCost;


power++;


upgradeCost =
Math.floor(upgradeCost*1.5);


updateUI();


}


};



updateUI();
