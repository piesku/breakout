import {AudioSource} from "./com_audio_source";
import {Draw} from "./com_draw";
import {Named} from "./com_named";
import {Transform2D} from "./com_transform2d";

export const enum Get {
    AudioSource,
    Draw,
    Named,
    Transform2D,
}

export interface ComponentData {
    [Get.AudioSource]: Array<AudioSource>;
    [Get.Draw]: Array<Draw>;
    [Get.Named]: Array<Named>;
    [Get.Transform2D]: Array<Transform2D>;
}

export const enum Has {
    AudioSource = 1 << Get.AudioSource,
    Draw = 1 << Get.Draw,
    Named = 1 << Get.Named,
    Transform2D = 1 << Get.Transform2D,
}
