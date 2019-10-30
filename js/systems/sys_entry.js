import { ease_in_out_elastic } from "../math/easing.js";
import { lerp } from "../math/vec2.js";
const QUERY = 256 /* Transform2D */ | 2048 /* Entry */ | 2 /* Collide */;
export function sys_entry(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}
function update(game, entity, delta) {
    let entry = game[11 /* Entry */][entity];
    let transform = game[8 /* Transform2D */][entity];
    let collide = game[1 /* Collide */][entity];
    if (entry.CurrentTime <= entry.Time) {
        let time = ease_in_out_elastic(entry.CurrentTime / entry.Time);
        transform.Translation = lerp([0, 0], entry.Initial, entry.Final, time);
        entry.CurrentTime += delta;
        transform.Dirty = true;
    }
    else {
        transform.Translation = [...entry.Final];
        game.World[entity] &= ~2048 /* Entry */;
        collide.New = true;
    }
}
//# sourceMappingURL=sys_entry.js.map