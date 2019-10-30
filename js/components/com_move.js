export function move(Speed) {
    return (game, entity) => {
        game.World[entity] |= 64 /* Move */;
        game[6 /* Move */][entity] = {
            Speed,
        };
    };
}
//# sourceMappingURL=com_move.js.map