import { draw_rect } from "../components/com_draw.js";
import { fade } from "../components/com_fade.js";
import { move } from "../components/com_move.js";
export let get_blu_explosion = function (x, y, color, frames_alive) {
    let number_of_explosions = 32;
    let Children = [];
    let step = (Math.PI * 2) / number_of_explosions;
    let fade_step = 1 / frames_alive;
    for (let i = 0; i < number_of_explosions; i++) {
        Children.push({
            Using: [draw_rect(20, 20, color), move(step * i, 1000), fade(fade_step)],
        });
    }
    return {
        Translation: [x, y],
        Children,
    };
};
//# sourceMappingURL=blu_explosion.js.map