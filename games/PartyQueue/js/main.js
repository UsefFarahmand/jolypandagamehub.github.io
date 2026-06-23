import { gameState }         from "./game/gameState.js";
import { Player }             from "./player.js";
import { createDeck, drawCard } from "./game/deck.js";
import { startTurn, playCard }  from "./game/turnManager.js";
import { updateUI, initializeUI } from "./ui/ui.js";
import { initTutorial }       from "./game/tutorial.js";
import { initMobileUI, initMobileTabs } from "./ui/mobile-ui.js";
import { PLAYER_TYPES, AI_DIFFICULTY, BOT_AVATARS } from "./constants/playerTypes.js";
import { loadIcons } from "./ui/icon-ui.js"
import { playBackgroundMusic } from "./services/soundManager.js"

const BOT_DEFS = [
    { id: "p2", name: "Bot 1" },
    { id: "p3", name: "Bot 2" },
    { id: "p4", name: "Bot 3" }
];

const PLAYER_COLORS = { p1: "var(--p1)", p2: "var(--p2)", p3: "var(--p3)", p4: "var(--p4)" };

// ── Build the difficulty panel inside splash ──────────────
async function buildDifficultyPanel() {
    const panel = document.getElementById("difficultyPanel");
    if (!panel) return;

    panel.innerHTML = BOT_DEFS.map(bot => `
        <div class="bot-row" id="botRow_${bot.id}">
            <<div class="bot-avatar" id="botAvatar_${bot.id}">
                <span data-icon="bot-easy"></span>
            </div>
            <div class="bot-info">
                <div class="bot-name">${bot.name}</div>
                <div class="diff-toggle" data-bot="${bot.id}">
                    ${["easy","medium","hard"].map(d => `
                        <button class="diff-btn ${d === "easy" ? "active" : ""}"
                                data-diff="${d}"
                                data-bot="${bot.id}">
                            ${BOT_AVATARS[d].label}
                        </button>
                    `).join("")}
                </div>
            </div>
        </div>
    `).join("");

    // store selections
    const selected = { p2: "easy", p3: "easy", p4: "easy" };

    async function updateBotDisplay(botId, diff) {
        selected[botId] = diff;
        const av = document.getElementById(`botAvatar_${botId}`);
        const row = document.getElementById(`botRow_${botId}`);
        if (av) {
            av.innerHTML = `<span data-icon="bot-${diff}"></span>`;
            loadIcons(av);
        }
        if (row) row.style.setProperty("--bot-color", BOT_AVATARS[diff].color);
        await loadIcons(av);
    }

    panel.addEventListener("click", e => {
        const btn = e.target.closest(".diff-btn");
        if (!btn) return;
        const botId = btn.dataset.bot;
        const diff  = btn.dataset.diff;

        // update active states
        panel.querySelectorAll(`.diff-btn[data-bot="${botId}"]`)
             .forEach(b => b.classList.toggle("active", b.dataset.diff === diff));

        updateBotDisplay(botId, diff);
    });

    // expose selections
    panel._getSelections = () => selected;

    await loadIcons(panel.innerHTML);
}

// ── Start game ────────────────────────────────────────────
async function startGame() {
    const panel = document.getElementById("difficultyPanel");
    const selections = panel?._getSelections?.() || { p2: "easy", p3: "easy", p4: "easy" };

    const players = [
        new Player("p1", "You",   PLAYER_TYPES.HUMAN),
        new Player("p2", "Bot 1", PLAYER_TYPES.AI, selections.p2),
        new Player("p3", "Bot 2", PLAYER_TYPES.AI, selections.p3),
        new Player("p4", "Bot 3", PLAYER_TYPES.AI, selections.p4),
    ];

    gameState.players = players;

    players.forEach(p => {
        p.deck = createDeck(p);
        for (let i = 0; i < 4; i++) drawCard(p);
    });

    document.getElementById("splashScreen").classList.add("hidden");
    document.getElementById("difficultyModal")?.classList.add("hidden");

    await initializeUI();
    initTutorial();
    initMobileUI();
    initMobileTabs();
    updateUI(gameState);
    startTurn(gameState);
}

// ── Wire up splash → difficulty panel → start ─────────────
document.getElementById("startGameBtn")?.addEventListener("click", () => {
    document.getElementById("splashScreen").classList.add("hidden");
    document.getElementById("difficultyModal")?.classList.remove("hidden");
});

document.getElementById("confirmDiffBtn")?.addEventListener("click", startGame);

buildDifficultyPanel();
playBackgroundMusic();
