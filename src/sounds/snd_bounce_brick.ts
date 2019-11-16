import {AudioClip} from "../components/com_audio_source";

export let snd_bounce_brick = <AudioClip>{
    Tracks: [
        {
            Instrument: [
                4,
                "lowpass",
                10,
                4,
                false,
                false,
                8,
                8,
                [
                    ["sine", 8, 2, 3, 4, 8, false, false, 8, 8, 7],
                    ["triangle", 6, 3, 3, 7, 10, false, false, 8, 8, 8],
                ],
            ],
            Notes: [53],
        },
    ],
    Exit: 0,
};
