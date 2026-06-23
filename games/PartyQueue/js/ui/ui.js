import { 
    renderGame 
}
from "./game-ui.js";

import {
    renderLeaderboard
}
from "./leaderboard-ui.js";

import {
    renderLog
}
from "./log-ui.js";

import {
    syncMobilePanels,
    initMobileUI
}
from "./mobile-ui.js";

import {
    loadIcons
}
from "./icon-ui.js"

import { initSoundToggle } from "../services/soundManager.js"


import {
    initializeModals
}
from "./modal-ui.js"

export async function initializeUI(){
    await loadIcons();
    
    initMobileUI();

    initializeModals();
    initSoundToggle();
}

export function updateUI(gameState){

    renderGame(gameState);

    renderLeaderboard(gameState);

    renderLog(gameState);

    syncMobilePanels();
}