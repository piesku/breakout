import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface Draw {
    Size: number;
}

export function draw_rect(Size: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Draw;
        game[Get.Draw][entity] = <Draw>{
            Size,
        };
    };
}
