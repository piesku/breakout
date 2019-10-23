import { collide } from "../components/com_collide.js";
import { control_brick } from "../components/com_control_brick.js";
import { draw_rect } from "../components/com_draw.js";
export function create_brick(width, height) {
    return {
        Using: [
            control_brick(),
            collide(false, [width, height]),
            draw_rect(width, height, "green"),
        ],
    };
}
//# sourceMappingURL=blu_brick.js.map