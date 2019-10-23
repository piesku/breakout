export function control_paddle(Width) {
    return (game, entity) => {
        game.World[entity] |= 16 /* ControlPaddle */;
        game[4 /* ControlPaddle */][entity] = {
            Width,
        };
    };
}
//# sourceMappingURL=com_control_paddle.js.map