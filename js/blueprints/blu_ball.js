import { collide } from "../components/com_collide.js";
import { control_ball } from "../components/com_control_ball.js";
import { draw_rect } from "../components/com_draw.js";
import { move } from "../components/com_move.js";
export let ball_blueprint = {
    Using: [control_ball(), move(1, 300), collide(true, [20, 20]), draw_rect(20, 20, "orange")],
};
//# sourceMappingURL=blu_ball.js.map