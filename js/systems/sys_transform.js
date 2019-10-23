import { from_rotation_translation_scale, invert, multiply } from "../math/mat4.js";
const QUERY = 16384 /* Transform */;
export function sys_transform(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game[14 /* Transform */][i]);
        }
    }
}
function update(transform) {
    if (transform.Dirty) {
        transform.Dirty = false;
        set_children_as_dirty(transform);
        from_rotation_translation_scale(transform.World, transform.Rotation, transform.Translation, transform.Scale);
        if (transform.Parent) {
            multiply(transform.World, transform.Parent.World, transform.World);
        }
        invert(transform.Self, transform.World);
    }
}
function set_children_as_dirty(transform) {
    for (let child of transform.Children) {
        child.Dirty = true;
        set_children_as_dirty(child);
    }
}
//# sourceMappingURL=sys_transform.js.map