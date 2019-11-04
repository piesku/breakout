import {Entity, Game} from "../game.js";
import {Has} from "./com_index.js";

export function control_brick() {
    return (game: Game, entity: Entity) => {
        game.World.Mask[entity] |= Has.ControlBrick;
    };
}
