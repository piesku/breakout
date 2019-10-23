export function move(angle, Speed) {
    return (game, entity) => {
        game.World[entity] |= 64 /* Move */;
        game[6 /* Move */][entity] = {
            Direction: [Math.cos(angle), Math.sin(angle)],
            Speed,
        };
    };
}
//# sourceMappingURL=com_move.js.map