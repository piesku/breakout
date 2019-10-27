import {AudioSource} from "./com_audio_source";
import {Collide} from "./com_collide";
import {ControlBall} from "./com_control_ball";
import {ControlBrick} from "./com_control_brick";
import {ControlPaddle} from "./com_control_paddle";
import {Draw} from "./com_draw";
import {Fade} from "./com_fade";
import {Move} from "./com_move";
import {Named} from "./com_named";
import {Shake} from "./com_shake";
import {Transform2D} from "./com_transform2d";

export const enum Get {
    AudioSource,
    Collide,
    ControlBall,
    ControlBrick,
    ControlPaddle,
    Draw,
    Move,
    Named,
    Transform2D,
    Shake,
    Fade,
}

export interface ComponentData {
    [Get.AudioSource]: Array<AudioSource>;
    [Get.Collide]: Array<Collide>;
    [Get.ControlBall]: Array<ControlBall>;
    [Get.ControlBrick]: Array<ControlBrick>;
    [Get.ControlPaddle]: Array<ControlPaddle>;
    [Get.Draw]: Array<Draw>;
    [Get.Move]: Array<Move>;
    [Get.Named]: Array<Named>;
    [Get.Transform2D]: Array<Transform2D>;
    [Get.Shake]: Array<Shake>;
    [Get.Fade]: Array<Fade>;
}

export const enum Has {
    AudioSource = 1 << Get.AudioSource,
    Collide = 1 << Get.Collide,
    ControlBall = 1 << Get.ControlBall,
    ControlBrick = 1 << Get.ControlBrick,
    ControlPaddle = 1 << Get.ControlPaddle,
    Draw = 1 << Get.Draw,
    Move = 1 << Get.Move,
    Named = 1 << Get.Named,
    Transform2D = 1 << Get.Transform2D,
    Shake = 1 << Get.Shake,
    Fade = 1 << Get.Fade,
}
