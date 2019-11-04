import {Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.ControlBrick | Has.Collide;

export function sys_control_brick(game: Game, delta: number) {
    for (let i = 0; i < game.World.Mask.length; i++) {
        if ((game.World.Mask[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let collide = game.World.Collide[entity];

    if (collide.Collisions.length > 0) {
        game.Destroy(entity);
    }
}
