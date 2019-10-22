import {collide} from "../components/com_collide.js";
import {control_paddle} from "../components/com_control_paddle.js";
import {draw_rect} from "../components/com_draw.js";
import {Blueprint2D} from "./blu_common.js";

export let paddle_blueprint = <Blueprint2D>{
    Using: [control_paddle(100), collide(true, [100, 20]), draw_rect(100, 20, "red")],
};
