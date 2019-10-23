export function control_brick() {
    return (game, entity) => {
        game.World[entity] |= 8 /* ControlBrick */;
        game[3 /* ControlBrick */][entity] = {};
    };
}
//# sourceMappingURL=com_control_brick.js.map