import {draw_rect} from "../components/com_draw.js";
import {fade} from "../components/com_fade.js";
import {Blueprint2D} from "./blu_common.js";

export let get_blu_tail = function(width: number, height: number, color: string) {
    return <Blueprint2D>{
        Using: [draw_rect(width, height, color), fade(0.05)],
    };
};
