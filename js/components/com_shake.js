/**
 * sys_shake modifies the transform of the entity. Add it to children only.
 */
export function shake(Duration = 0) {
    return (game, entity) => {
        game.World[entity] |= 64 /* Shake */;
        game[6 /* Shake */][entity] = {
            Duration,
        };
    };
}
//# sourceMappingURL=com_shake.js.map