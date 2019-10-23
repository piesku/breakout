export function rigid_body(Dynamic = true) {
    return (game, entity) => {
        game.World[entity] |= 4096 /* RigidBody */;
        game[12 /* RigidBody */][entity] = { Dynamic, VelY: 0, AccY: 0 };
    };
}
//# sourceMappingURL=com_rigid_body.js.map