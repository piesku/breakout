export function named(Name) {
    return (game, entity) => {
        game.World[entity] |= 8 /* Named */;
        game[3 /* Named */][entity] = { Name };
    };
}
export function find_first(game, name) {
    for (let i = 0; i < game[3 /* Named */].length; i++) {
        let named = game[3 /* Named */][i];
        if (named && named.Name === name) {
            return i;
        }
    }
    throw `No entity named ${name}.`;
}
//# sourceMappingURL=com_named copy.js.map