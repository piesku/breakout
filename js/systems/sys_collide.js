import { get_translation } from "../math/mat2d.js";
import { negate } from "../math/vec2.js";
const QUERY = 64 /* Transform2D */ | 1 /* Collide */;
export function sys_collide(game, delta) {
    // Collect all colliders.
    let all_colliders = [];
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            let transform = game[6 /* Transform2D */][i];
            let collider = game[0 /* Collide */][i];
            // Prepare the collider for this tick.
            collider.Collisions = [];
            compute_aabb(transform, collider);
            all_colliders.push(collider);
        }
    }
    for (let i = 0; i < all_colliders.length; i++) {
        check_collisions(all_colliders[i], all_colliders);
    }
}
function compute_aabb(transform, collide) {
    get_translation(collide.Center, transform.World);
    collide.Min[0] = collide.Center[0] - collide.Size[0] / 2;
    collide.Min[1] = collide.Center[1] - collide.Size[1] / 2;
    collide.Max[0] = collide.Center[0] + collide.Size[0] / 2;
    collide.Max[1] = collide.Center[1] + collide.Size[1] / 2;
}
function check_collisions(collider, colliders) {
    for (let i = 0; i < colliders.length; i++) {
        let other = colliders[i];
        if (other !== collider && intersect_aabb(collider, other)) {
            let hit = penetrate_aabb(collider, other);
            collider.Collisions.push({
                Other: other,
                Hit: hit,
            });
            other.Collisions.push({
                Other: collider,
                Hit: negate([0, 0], hit),
            });
        }
    }
}
function penetrate_aabb(a, b) {
    let distance_x = a.Center[0] - b.Center[0];
    let penetration_x = a.Size[0] / 2 + b.Size[0] / 2 - Math.abs(distance_x);
    let distance_y = a.Center[1] - b.Center[1];
    let penetration_y = a.Size[1] / 2 + b.Size[1] / 2 - Math.abs(distance_y);
    if (penetration_x < penetration_y) {
        return [penetration_x * Math.sign(distance_x), 0];
    }
    else {
        return [0, penetration_y * Math.sign(distance_y)];
    }
}
function intersect_aabb(a, b) {
    return a.Min[0] < b.Max[0] && a.Max[0] > b.Min[0] && a.Min[1] < b.Max[1] && a.Max[1] > b.Min[1];
}
//# sourceMappingURL=sys_collide.js.map