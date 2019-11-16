import {AudioClip} from "../components/com_audio_source";

export let snd_bounce_paddle = <AudioClip>{
    Tracks: [
        {
            Instrument: [
                8,
                "lowpass",
                8,
                8,
                false,
                false,
                8,
                8,
                [["sine", 8, 2, 2, 3, 8, false, false, 8, 8, 8], [false, 5, 1, 2, 6]],
            ],
            Notes: [65],
        },
    ],
    Exit: 0,
};
