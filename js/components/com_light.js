export function light(color = [1, 1, 1], range = 1) {
    return (game, EntityId) => {
        game.World[EntityId] |= 64 /* Light */;
        game[6 /* Light */][EntityId] = {
            EntityId,
            Color: color,
            Intensity: range ** 2,
        };
    };
}
//# sourceMappingURL=com_light.js.map