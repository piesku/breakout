import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Get, Has} from "./com_index.js";

export interface Entry {
    Initial: Vec2;
    Final: Vec2;
    Time: number;
    CurrentTime: number;
}

export function entry(Initial: Vec2, Final: Vec2, Time: number) {
    return (game: Game, entity: Entity) => {
        game.World[entity] |= Has.Entry;
        game[Get.Entry][entity] = <Entry>{
            Initial,
            Final,
            Time,
            CurrentTime: 0,
        };
    };
}
