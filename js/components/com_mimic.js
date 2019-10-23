export function mimic(target, stiffness = 0.1) {
    return (game, entity) => {
        game.World[entity] |= 128 /* Mimic */;
        game[7 /* Mimic */][entity] = {
            target,
            stiffness,
        };
    };
}
//# sourceMappingURL=com_mimic.js.map