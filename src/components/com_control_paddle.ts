import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface ControlPaddle {
    Width: number;
}

export function control_paddle(Width: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.ControlPaddle;
        game[Get.ControlPaddle][entity] = <ControlPaddle>{
            Width,
        };
    };
}
