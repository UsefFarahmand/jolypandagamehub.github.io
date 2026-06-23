import { AI_DIFFICULTY } from "./constants/playerTypes.js";

export class Player {

    constructor(id, name, type = "human", difficulty = AI_DIFFICULTY.EASY) {

        this.id         = id;
        this.name       = name;
        this.type       = type;
        this.difficulty = difficulty;

        this.deck  = [];
        this.hand  = [];
        this.party = [];
    }
}
