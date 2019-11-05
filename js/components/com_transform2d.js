import { create } from "../math/mat2d.js";
export function transform2d(Translation = [0, 0], Rotation = 0, Scale = [1, 1]) {
    return (game, EntityId) => {
        game.World[EntityId] |= 64 /* Transform2D */;
        game[6 /* Transform2D */][EntityId] = {
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
//# sourceMappingURL=com_transform2d.js.map