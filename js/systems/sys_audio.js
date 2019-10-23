import { play_note } from "../audio.js";
const QUERY = 1 /* AudioSource */;
export function sys_audio(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let audio_source = game[0 /* AudioSource */][entity];
    let can_exit = !audio_source.Current || audio_source.Time > audio_source.Current.Exit;
    if (audio_source.Trigger && can_exit) {
        // Seconds per beat, corresponding to a quarter note.
        let spb = 60 / (audio_source.Trigger.BPM || 120);
        // Track timing is based on sixteenth notes.
        let interval = spb / 4;
        for (let track of audio_source.Trigger.Tracks) {
            for (let i = 0; i < track.Notes.length; i++) {
                if (track.Notes[i]) {
                    play_note(game.Audio, track.Instrument, track.Notes[i], i * interval);
                }
            }
        }
        audio_source.Current = audio_source.Trigger;
        audio_source.Time = 0;
    }
    else {
        audio_source.Time += delta;
    }
    // Audio triggers are only valid in the frame they're set; they don't stack
    // up. Otherwise sound effects would go out of sync with the game logic.
    // Reset the trigger to the default or undefined, regardless of whether it
    // triggered a new clip to play.
    audio_source.Trigger = audio_source.Idle;
}
//# sourceMappingURL=sys_audio.js.map