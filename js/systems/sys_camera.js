import { invert, multiply } from "../math/mat4.js";
const QUERY = 16384 /* Transform */ | 4 /* Camera */;
export function sys_camera(game, delta) {
    game.Cameras = [];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let transform = game[14 /* Transform */][entity];
    let camera = game[2 /* Camera */][entity];
    game.Cameras.push(camera);
    invert(camera.View, transform.World);
    multiply(camera.PV, camera.Projection, camera.View);
}
//# sourceMappingURL=sys_camera.js.map