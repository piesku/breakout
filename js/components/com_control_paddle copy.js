export function control_paddle(Width) {
    return (game, entity) => {
        game.World[entity] |= 2 /* ControlPaddle */;
        game[1 /* ControlPaddle */][entity] = {
            Width,
        };
    };
}
//# sourceMappingURL=com_control_paddle copy.js.map