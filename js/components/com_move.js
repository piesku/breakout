export function move(Speed) {
    return (game, entity) => {
        game.World[entity] |= 32 /* Move */;
        game[5 /* Move */][entity] = {
            Direction: [0, 0],
            Speed,
        };
    };
}
//# sourceMappingURL=com_move.js.map