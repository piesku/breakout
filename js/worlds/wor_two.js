import { collide } from "../components/com_collide.js";
import { control_ball } from "../components/com_control_ball.js";
import { draw_rect } from "../components/com_draw.js";
import { move } from "../components/com_move.js";
export function world_two(game) {
    game.World = [];
    for (let i = 0; i < 10; i++) {
        game.Add({
            Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
            Using: [
                control_ball(Math.random() * Math.PI * -1),
                move(300),
                collide([20, 20]),
                draw_rect(20, 20, "orange"),
            ],
        });
    }
}
//# sourceMappingURL=wor_two.js.map