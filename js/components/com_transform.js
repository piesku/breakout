import { create } from "../math/mat4.js";
export function transform(Translation = [0, 0, 0], Rotation = [0, 0, 0, 1], Scale = [1, 1, 1]) {
    return (game, EntityId) => {
        game.World[EntityId] |= 16384 /* Transform */;
        game[14 /* Transform */][EntityId] = {
            EntityId,
            World: create(),
            Self: create(),
            Translation,
            Rotation,
            Scale,
            Children: [],
            Dirty: true,
        };
    };
}
/**
 * Get all component instances of a given type from the current entity and all
 * its children.
 *
 * @param game Game object which stores the component data.
 * @param transform The transform to traverse.
 * @param component Component mask to look for.
 */
export function* components_of_type(game, transform, component) {
    if (game.World[transform.EntityId] & (1 << component)) {
        yield game[component][transform.EntityId];
    }
    for (let child of transform.Children) {
        yield* components_of_type(game, child, component);
    }
}
//# sourceMappingURL=com_transform.js.map