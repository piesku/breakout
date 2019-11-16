import {AudioClip} from "../components/com_audio_source";

export let snd_bounce_wall = <AudioClip>{
    Tracks: [
        {
            Instrument: [
                4,
                "lowpass",
                8,
                8,
                false,
                false,
                8,
                8,
                [["sine", 8, 2, 2, 3, 8, false, false, 8, 8, 8], [false, 3, 1, 2, 6]],
            ],
            Notes: [64],
        },
    ],
    Exit: 0,
};
