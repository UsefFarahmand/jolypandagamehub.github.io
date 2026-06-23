export function renderLeaderboard(gameState) {

    const sorted = [...gameState.players].sort((a, b) => {
        const ap = a.party.reduce((s, c) => s + c.power, 0);
        const bp = b.party.reduce((s, c) => s + c.power, 0);
        if (bp !== ap) return bp - ap;
        // tiebreaker: more party cards wins
        return b.party.length - a.party.length;
    });

    const rowsHTML = sorted.map((p, i) => {
        const score = p.party.reduce((s, c) => s + c.power, 0);
        const count = p.party.length;
        const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `#${i+1}`;
        return `<div class="leaderboard-row" data-player="${p.id}">
            <span class="lb-rank">${medal}</span>
            <span class="lb-name">${p.name}</span>
            <span class="lb-cards" title="Party cards">${count} 🎉</span>
            <span class="lb-score" title="Total power">${score} ⚡</span>
        </div>`;
    }).join("");

    // header
    const headerHTML = `<div class="leaderboard-header">
        <span></span><span>Player</span>
        <span>Cards</span><span>Score</span>
    </div>`;

    const desktopRows = document.getElementById("leaderboardRows");
    if (desktopRows) desktopRows.innerHTML = headerHTML + rowsHTML;

    const mobileInline = document.getElementById("mobileLeaderboardInline");
    if (mobileInline) mobileInline.innerHTML = headerHTML + rowsHTML;
}
