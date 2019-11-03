import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {control_brick} from "../components/com_control_brick.js";
import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight - 20],
        Using: [
            control_paddle(100),
            move(500),
            collide(true, [100, 20]),
            draw_rect(100, 20, "red"),
        ],
    });

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight - 100],
        Using: [
            control_ball(-Math.random() * Math.PI),
            move(300),
            collide(true, [20, 20]),
            draw_rect(20, 20, "orange"),
        ],
    });

    let col_count = 5;
    let row_count = 5;
    let brick_width = 100;
    let brick_height = 20;
    let padding = 10;

    let top_left_x = (game.ViewportWidth - brick_width * col_count - padding * (col_count - 1)) / 2;
    let top_left_y = 100;

    for (let row = 0; row < row_count; row++) {
        let y = top_left_y + row * (brick_height + padding) + brick_height / 2;
        for (let col = 0; col < col_count; col++) {
            let x = top_left_x + col * (brick_width + padding) + brick_width / 2;
            game.Add({
                Translation: [x, y],
                Using: [
                    control_brick(),
                    collide(false, [brick_width, brick_height]),
                    draw_rect(brick_width, brick_height, "green"),
                ],
            });
        }
    }
}
