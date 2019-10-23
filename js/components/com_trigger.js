export function trigger(Action) {
    return (game, entity) => {
        game.World[entity] |= 256 /* Trigger */;
        game[8 /* Trigger */][entity] = {
            Action,
        };
    };
}
//# sourceMappingURL=com_trigger.js.map