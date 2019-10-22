import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface ControlBall {}

export function control_ball() {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.ControlBall;
        game[Get.ControlBall][entity] = <ControlBall>{};
    };
}
