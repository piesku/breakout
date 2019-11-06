import {Game} from "./game.js";
import {world_main} from "./worlds/wor_main.js";

let game = new Game();
world_main(game);
game.Start();

// @ts-ignore
window.game = game;
