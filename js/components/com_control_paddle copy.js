export function control_paddle() {
    return (game, entity) => {
        game.World[entity] |= 2 /* ControlPaddle */;
        game[1 /* ControlPaddle */][entity] = {};
    };
}
//# sourceMappingURL=com_control_paddle copy.js.map