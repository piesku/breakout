import { get_translation } from "../math/mat4.js";
import { transform_point } from "../math/vec3.js";
const QUERY = 16384 /* Transform */ | 16 /* Draw */;
export function sys_draw(game, delta) {
    game.Context2D.resetTransform();
    game.Context2D.clearRect(0, 0, game.ViewportWidth, game.ViewportHeight);
    let position = [0, 0, 0];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            // World position.
            get_translation(position, game[14 /* Transform */][i].World);
            // NDC position.
            transform_point(position, position, game.Cameras[0].PV);
            game.Context2D.setTransform(1, 0, 0, 1, 0.5 * (position[0] + 1) * game.ViewportWidth, 0.5 * (-position[1] + 1) * game.ViewportHeight);
            let draw = game[4 /* Draw */][i];
            switch (draw.Kind) {
                case 0 /* Marker */:
                    draw_marker(game, draw);
                    break;
            }
        }
    }
}
function draw_marker(game, draw) {
    game.Context2D.font = "10vmin sans";
    game.Context2D.textAlign = "center";
    game.Context2D.fillStyle = "#fff";
    game.Context2D.fillText(draw.Marker, 0, 0);
}
//# sourceMappingURL=sys_draw.js.map