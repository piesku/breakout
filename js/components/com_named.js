export function named(Name) {
    return (game, entity) => {
        game.World[entity] |= 128 /* Named */;
        game[7 /* Named */][entity] = { Name };
    };
}
export function find_first(game, name) {
    for (let i = 0; i < game[7 /* Named */].length; i++) {
        let named = game[7 /* Named */][i];
        if (named && named.Name === name) {
            return i;
        }
    }
    throw `No entity named ${name}.`;
}
//# sourceMappingURL=com_named.js.map