export function renderLog(gameState) {

    const buildHTML = () => gameState.logs.map(entry => `
        <div class="log-entry ${entry.playerId}">
            <span class="player-name">${entry.playerName}</span>
            ${entry.text}
        </div>
    `).join("");

    const desktop = document.getElementById("logEntries");
    if (desktop) desktop.innerHTML = buildHTML();

    const mobile = document.getElementById("mobileLogContent");
    if (mobile) {
        mobile.innerHTML = buildHTML();
        mobile.scrollTop = mobile.scrollHeight;
    }
}
