export function control_paddle() {
    return (game, entity) => {
        game.World[entity] |= 8 /* ControlPaddle */;
        game[3 /* ControlPaddle */][entity] = {};
    };
}
//# sourceMappingURL=com_control_paddle.js.map