import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface ControlBrick {}

export function control_brick() {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.ControlBrick;
        game[Get.ControlBrick][entity] = <ControlBrick>{};
    };
}
