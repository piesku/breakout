const QUERY = 16384 /* Transform */ | 64 /* Light */;
export function sys_light(game, delta) {
    game.Lights = [];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    game.Lights.push(game[6 /* Light */][entity]);
}
//# sourceMappingURL=sys_light.js.map