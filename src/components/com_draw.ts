import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export interface Draw {
    Size: number;
}

export function draw_rect(Size: number) {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.Draw;
        game.World.Draw[entity] = <Draw>{
            Size,
        };
    };
}
