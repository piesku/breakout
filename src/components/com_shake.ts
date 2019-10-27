import {Entity, Game} from "../game.js";
import {Get, Has} from "./com_index.js";

export interface Shake {
    Duration: number;
    Strength: number;
}

export function shake(Duration = 0, Strength = 5) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Shake;
        game[Get.Shake][entity] = <Shake>{
            Duration,
            Strength,
        };
    };
}
