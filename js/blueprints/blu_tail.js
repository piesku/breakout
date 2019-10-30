import { draw_rect } from "../components/com_draw.js";
import { fade } from "../components/com_fade.js";
export let get_blu_tail = function (width, height, color) {
    return {
        Using: [draw_rect(width, height, color), fade(0.05)],
    };
};
//# sourceMappingURL=blu_tail.js.map