export function collide(Dynamic = true, Size) {
    return (game, EntityId) => {
        game.World[EntityId] |= 2 /* Collide */;
        game[1 /* Collide */][EntityId] = {
            EntityId,
            New: true,
            Dynamic,
            Size,
            Min: [0, 0],
            Max: [0, 0],
            Center: [0, 0],
            Collisions: [],
        };
    };
}
//# sourceMappingURL=com_collide.js.map