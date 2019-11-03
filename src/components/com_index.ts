import {Collide} from "./com_collide";
import {ControlPaddle} from "./com_control_paddle";
import {Draw} from "./com_draw";
import {Named} from "./com_named";
import {Transform2D} from "./com_transform2d";

export const enum Get {
    Collide,
    ControlPaddle,
    Draw,
    Named,
    Transform2D,
}

export interface ComponentData {
    [Get.Collide]: Array<Collide>;
    [Get.ControlPaddle]: Array<ControlPaddle>;
    [Get.Draw]: Array<Draw>;
    [Get.Named]: Array<Named>;
    [Get.Transform2D]: Array<Transform2D>;
}

export const enum Has {
    Collide = 1 << Get.Collide,
    ControlPaddle = 1 << Get.ControlPaddle,
    Draw = 1 << Get.Draw,
    Named = 1 << Get.Named,
    Transform2D = 1 << Get.Transform2D,
}
