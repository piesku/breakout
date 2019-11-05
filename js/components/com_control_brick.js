export function control_brick() {
    return (game, entity) => {
        game.World[entity] |= 4 /* ControlBrick */;
        game[2 /* ControlBrick */][entity] = {};
    };
}
//# sourceMappingURL=com_control_brick.js.map