import { dispatch } from "../actions.js";
const QUERY = Has.Transform | Has.Collide | 256 /* Trigger */;
export function sys_trigger(game, delta) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}
function update(game, entity) {
    if (game[Get.Collide][entity].Collisions.length > 0) {
        dispatch(game, game[8 /* Trigger */][entity].Action, [entity]);
    }
}
//# sourceMappingURL=sys_trigger.js.map