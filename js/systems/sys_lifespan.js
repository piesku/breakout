const QUERY = 32 /* Transform2D */ | 4 /* Lifespan */;
export function sys_lifespan(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let lifespan = game[2 /* Lifespan */][entity];
    lifespan.Age += delta;
    if (lifespan.Age > lifespan.Max) {
        game.Destroy2D(entity);
    }
}
//# sourceMappingURL=sys_lifespan.js.map