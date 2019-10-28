import {collide} from "../components/com_collide.js";
import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {entry} from "../components/com_entry.js";
import {Game} from "../game.js";
import {Blueprint2D} from "./blu_common.js";

export let get_paddle_blueprint = function(game: Game) {
    let x = game.ViewportWidth / 2;
    let y = game.ViewportHeight - 20;

    return <Blueprint2D>{
        Translation: [x, y],
        Using: [
            control_paddle(100),
            collide(true, [100, 20]),
            draw_rect(100, 20, "red"),
            entry([x, -10], [x, y], 1),
        ],
    };
};
