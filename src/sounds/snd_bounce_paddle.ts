import {AudioClip} from "../components/com_audio_source";

export let snd_bounce_paddle = <AudioClip>{
    Tracks: [
        {
            Instrument: [
                4,
                "lowpass",
                11,
                4,
                false,
                false,
                8,
                3,
                [["triangle", 8, 1, 2, 9, 8, false, true, 0, 2, 10], [false, 5, 1, 1, 4]],
            ],
            Notes: [69],
        },
    ],
    Exit: 0,
};
