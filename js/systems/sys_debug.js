import { render_basic } from "../components/com_render_basic.js";
import { scale } from "../math/vec3.js";
import { Cube } from "../shapes/Cube.js";
const wireframes = new Map();
export function sys_debug(game, delta) {
    // Prune wireframes corresponding to destroyed entities.
    for (let [key, wireframe] of wireframes) {
        if (
        // If the entity doesn't have TRANSFORM...
        !(game.World[wireframe.entity] & 16384 /* Transform */) ||
            // ...or if it's not the same TRANSFORM.
            game[14 /* Transform */][wireframe.entity] !== wireframe.anchor) {
            game.Destroy(wireframe.transform.EntityId);
            wireframes.delete(key);
        }
    }
    for (let i = 0; i < game.World.length; i++) {
        if (game.World[i] & 16384 /* Transform */) {
            // Draw colliders first. If the collider's wireframe overlaps
            // exactly with the transform's wireframe, we want the collider to
            // take priority.
            if (game.World[i] & 8 /* Collide */) {
                wireframe_collider(game, i);
            }
            // Draw invisible entities.
            if (!(game.World[i] & 2048 /* Render */)) {
                wireframe_entity(game, i);
            }
        }
    }
}
function wireframe_entity(game, entity) {
    let entity_transform = game[14 /* Transform */][entity];
    let wireframe = wireframes.get(entity_transform);
    if (!wireframe) {
        let box = game.Add({
            Using: [render_basic(game.Materials[1 /* Wireframe */], Cube, [1, 0, 1, 1])],
        });
        let wireframe_transform = game[14 /* Transform */][box];
        wireframe_transform.World = entity_transform.World;
        wireframe_transform.Dirty = false;
        wireframes.set(entity_transform, {
            entity,
            anchor: entity_transform,
            transform: wireframe_transform,
        });
    }
}
function wireframe_collider(game, entity) {
    let transform = game[14 /* Transform */][entity];
    let collide = game[3 /* Collide */][entity];
    let wireframe = wireframes.get(collide);
    if (!wireframe) {
        let box = game.Add({
            Translation: collide.Center,
            Scale: scale([0, 0, 0], collide.Half, 2),
            Using: [render_basic(game.Materials[1 /* Wireframe */], Cube, [0, 1, 0, 1])],
        });
        wireframes.set(collide, {
            entity,
            anchor: transform,
            transform: game[14 /* Transform */][box],
        });
    }
    else if (collide.Dynamic) {
        wireframe.transform.Translation = collide.Center;
        scale(wireframe.transform.Scale, collide.Half, 2);
        wireframe.transform.Dirty = true;
    }
}
//# sourceMappingURL=sys_debug.js.map