export function shake(Duration = 0, Strength = 5) {
    return (game, entity) => {
        game.World[entity] |= 512 /* Shake */;
        game[9 /* Shake */][entity] = {
            Duration,
            Strength,
        };
    };
}
//# sourceMappingURL=com_shake.js.map