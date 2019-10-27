import {collide} from "../components/com_collide.js";
import {control_ball} from "../components/com_control_ball.js";
import {draw_rect} from "../components/com_draw.js";
import {move} from "../components/com_move.js";
import {Blueprint2D} from "./blu_common.js";

export let ball_blueprint = <Blueprint2D>{
    Using: [control_ball(), move(1, 500), collide(true, [20, 20]), draw_rect(20, 20, "orange")],
};
