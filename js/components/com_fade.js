export function fade(Step = 0.1) {
    return (game, entity) => {
        game.World[entity] |= 1024 /* Fade */;
        game[10 /* Fade */][entity] = {
            Step,
        };
    };
}
//# sourceMappingURL=com_fade.js.map