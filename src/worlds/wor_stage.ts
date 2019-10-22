import {draw_rect} from "../components/com_draw.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];

    // Player-controlled camera.
    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Using: [draw_rect(200, 100, "red")],
    });
}
