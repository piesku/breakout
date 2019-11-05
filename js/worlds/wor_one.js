import { control_paddle } from "../components/com_control_paddle.js";
import { draw_rect } from "../components/com_draw.js";
import { move } from "../components/com_move.js";
export function world_one(game) {
    game.World = [];
    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        Using: [control_paddle(), move(500), draw_rect(50, 50, "red")],
    });
}
//# sourceMappingURL=wor_one.js.map