export function control_ball(angle) {
    return (game, entity) => {
        game.World[entity] |= 2 /* ControlBall */;
        game[1 /* ControlBall */][entity] = {
            Direction: [Math.cos(angle), Math.sin(angle)],
        };
    };
}
//# sourceMappingURL=com_control_ball.js.map