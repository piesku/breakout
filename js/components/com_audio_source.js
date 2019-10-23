/**
 * Add the AudioSource component.
 *
 * @param idle The name of the clip to play by default, in a loop.
 */
export function audio_source(idle) {
    return (game, entity) => {
        game.World[entity] |= 1 /* AudioSource */;
        game[0 /* AudioSource */][entity] = {
            Idle: idle,
            Time: 0,
        };
    };
}
//# sourceMappingURL=com_audio_source.js.map