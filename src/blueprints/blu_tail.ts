import {draw_rect} from "../components/com_draw.js";
import {fade} from "../components/com_fade.js";
import {Blueprint2D} from "./blu_common.js";

export let blu_tail = <Blueprint2D>{
    Using: [draw_rect(20, 20, "orange"), fade(0.05)],
};
