import {Entity, Game} from "../game.js";
import {Vec2} from "../math/index.js";
import {Has} from "./com_index.js";

export interface Collide {
    readonly EntityId: Entity;
    /** The size of the collider in world units. */
    Size: [number, number];
    /** The min corner of the AABB. */
    Min: Vec2;
    /** The max corner of the AABB. */
    Max: Vec2;
    /** The world position of the AABB. */
    Center: Vec2;
    /** Collisions detected with this collider during this tick. */
    Collisions: Array<Collision>;
}

export function collide(Size: [number, number]) {
    return (game: Game, EntityId: Entity) => {
        game.World.Mask[EntityId] |= Has.Collide;
        game.World.Collide[EntityId] = <Collide>{
            EntityId,
            Size,
            Min: [0, 0],
            Max: [0, 0],
            Center: [0, 0],
            Collisions: [],
        };
    };
}

export interface Collision {
    /** The other collider in the collision. */
    Other: Collide;
    /** The direction and magnitude of the hit from this collider's POV. */
    Hit: Vec2;
}
