import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {draw_rect} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {Game} from "../game.js";
import {Blueprint2D} from "./blu_common.js";

export let get_ball_blueprint = function(game: Game) {
    let x = game.ViewportWidth / 2;
    let y = game.ViewportHeight - 100;

    return <Blueprint2D>{
        Translation: [x, y],
        Using: [
            control_ball(),
            move(75, 500),
            collide(true, [20, 20]),
            draw_rect(20, 20, "orange"),
        ],
    };
};
