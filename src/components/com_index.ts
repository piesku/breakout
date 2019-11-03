import {Collide} from "./com_collide";
import {ControlBall} from "./com_control_ball";
import {ControlPaddle} from "./com_control_paddle";
import {Draw} from "./com_draw";
import {Move} from "./com_move";
import {Named} from "./com_named";
import {Transform2D} from "./com_transform2d";

export const enum Get {
    Collide,
    ControlBall,
    ControlPaddle,
    Draw,
    Move,
    Named,
    Transform2D,
}

export interface ComponentData {
    [Get.Collide]: Array<Collide>;
    [Get.ControlBall]: Array<ControlBall>;
    [Get.ControlPaddle]: Array<ControlPaddle>;
    [Get.Draw]: Array<Draw>;
    [Get.Move]: Array<Move>;
    [Get.Named]: Array<Named>;
    [Get.Transform2D]: Array<Transform2D>;
}

export const enum Has {
    Collide = 1 << Get.Collide,
    ControlBall = 1 << Get.ControlBall,
    ControlPaddle = 1 << Get.ControlPaddle,
    Draw = 1 << Get.Draw,
    Move = 1 << Get.Move,
    Named = 1 << Get.Named,
    Transform2D = 1 << Get.Transform2D,
}
