export function entry(Initial, Final, Time) {
    return (game, entity) => {
        game.World[entity] |= 2048 /* Entry */;
        game[11 /* Entry */][entity] = {
            Initial,
            Final,
            Time,
            CurrentTime: 0,
        };
    };
}
//# sourceMappingURL=com_entry.js.map