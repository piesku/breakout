export function named(Name) {
    return (game, entity) => {
        game.World[entity] |= Has.Named;
        game[Get.Named][entity] = { Name };
    };
}
export function find_first(game, name) {
    for (let i = 0; i < game[Get.Named].length; i++) {
        let named = game[Get.Named][i];
        if (named && named.Name === name) {
            return i;
        }
    }
    throw `No entity named ${name}.`;
}
//# sourceMappingURL=com_named.js.map