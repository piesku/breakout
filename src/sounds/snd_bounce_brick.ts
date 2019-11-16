import {AudioClip} from "../components/com_audio_source";

export let snd_bounce_brick = <AudioClip>{
    Tracks: [
        {
            Instrument: [
                4,
                "lowpass",
                11,
                8,
                false,
                false,
                8,
                8,
                [
                    ["sine", 5, 1, 2, 4, 8, false, false, 8, 8, 8],
                    ["triangle", 4, 2, 2, 7, 10, false, false, 8, 8, 7],
                ],
            ],
            Notes: [72],
        },
    ],
    Exit: 0,
};
