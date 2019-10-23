export function lifespan(Max = Infinity) {
    return (game, entity) => {
        game.World[entity] |= 4 /* Lifespan */;
        game[2 /* Lifespan */][entity] = {
            Max,
            Age: 0,
        };
    };
}
//# sourceMappingURL=com_lifespan.js.map