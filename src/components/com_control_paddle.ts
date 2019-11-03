import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface ControlPaddle {}

export function control_paddle() {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.ControlPaddle;
        game[Get.ControlPaddle][entity] = <ControlPaddle>{};
    };
}
