import {draw_rect} from "../components/com_draw.js";
import {Game} from "../game.js";

export function world_one(game: Game) {
    game.World = [];

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Using: [draw_rect(100)],
    });
}
