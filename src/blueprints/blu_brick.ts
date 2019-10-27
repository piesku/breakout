import {collide} from "../components/com_collide.js";
import {control_brick} from "../components/com_control_brick.js";
import {draw_rect} from "../components/com_draw.js";
import {fade} from "../components/com_fade.js";
import {Blueprint2D} from "./blu_common.js";

export function create_brick(width: number, height: number) {
    return <Blueprint2D>{
        Using: [
            control_brick(),
            collide(false, [width, height]),
            draw_rect(width, height, "green"),
            fade(0),
        ],
    };
}
