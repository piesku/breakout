export function player_control(Move, Yaw, Pitch) {
    return (game, entity) => {
        game.World[entity] |= 8 /* PlayerControl */;
        game[3 /* PlayerControl */][entity] = {
            Move,
            Yaw,
            Pitch,
        };
    };
}
//# sourceMappingURL=com_player_control.js.map