import { Game } from "./game.js";
import { world_three } from "./worlds/wor_three.js";
let game = new Game();
world_three(game);
game.Start();
// @ts-ignore
window.game = game;
//# sourceMappingURL=index.js.map