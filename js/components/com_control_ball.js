export function control_ball() {
    return (game, entity) => {
        game.World[entity] |= 4 /* ControlBall */;
        game[2 /* ControlBall */][entity] = {};
    };
}
//# sourceMappingURL=com_control_ball.js.map