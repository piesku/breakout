import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface Draw {
    Width: number;
    Height: number;
    Color: string;
}

export function draw_rect(Width: number, Height: number, Color: string) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Draw;
        game[Get.Draw][entity] = <Draw>{
            Width,
            Height,
            Color,
        };
    };
}
