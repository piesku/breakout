export function collide(Size) {
    return (game, EntityId) => {
        game.World[EntityId] |= 1 /* Collide */;
        game[0 /* Collide */][EntityId] = {
            EntityId,
            Size,
            Min: [0, 0],
            Max: [0, 0],
            Center: [0, 0],
            Collisions: [],
        };
    };
}
//# sourceMappingURL=com_collide.js.map