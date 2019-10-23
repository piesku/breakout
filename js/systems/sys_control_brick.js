const QUERY = 256 /* Transform2D */ | 8 /* ControlBrick */ | 2 /* Collide */;
export function sys_control_brick(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    let collide = game[1 /* Collide */][entity];
    if (collide.Collisions.length > 0) {
        game.Destroy(entity);
    }
}
//# sourceMappingURL=sys_control_brick.js.map