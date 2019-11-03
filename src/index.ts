import {Game} from "./game.js";
import {world_one} from "./worlds/wor_one.js";

let game = new Game();
world_one(game);
game.Start();

// @ts-ignore
window.game = game;
