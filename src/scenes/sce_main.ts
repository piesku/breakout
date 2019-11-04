import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {Game} from "../game.js";
import {World} from "../world.js";

export function scene_main(game: Game) {
    game.World = new World();

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight - 20],
        Using: [control_paddle(), move(500), collide([100, 20]), draw_rect(100, 20, "red")],
    });

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
