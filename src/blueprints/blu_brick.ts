import {collide} from "../components/com_collide.js";
import {draw_rect} from "../components/com_draw.js";
import {Blueprint2D} from "./blu_common.js";

export function create_brick(width: number, height: number) {
    return <Blueprint2D>{
        Using: [collide(true, [width, height]), draw_rect(width, height, "green")],
    };
}
