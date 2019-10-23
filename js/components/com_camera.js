import { create, perspective } from "../math/mat4.js";
export function camera(aspect, fovy, near, far) {
    return (game, entity) => {
        game.World[entity] |= 4 /* Camera */;
        game[2 /* Camera */][entity] = {
            Projection: perspective(create(), fovy, aspect, near, far),
            View: create(),
            PV: create(),
        };
    };
}
//# sourceMappingURL=com_camera.js.map