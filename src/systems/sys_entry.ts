import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {ease_in_out_elastic} from "../math/easing.js";
import {lerp} from "../math/vec2.js";

const QUERY = Has.Transform2D | Has.Entry | Has.Collide;

export function sys_entry(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let entry = game[Get.Entry][entity];
    let transform = game[Get.Transform2D][entity];
    let collide = game[Get.Collide][entity];

    if (entry.CurrentTime <= entry.Time) {
        let time = ease_in_out_elastic(entry.CurrentTime / entry.Time);
        transform.Translation = lerp([0, 0], entry.Initial, entry.Final, time);
        entry.CurrentTime += delta;
        transform.Dirty = true;
    } else {
        transform.Translation = [...entry.Final] as [number, number];
        game.World[entity] &= ~Has.Entry;
        collide.New = true;
    }
}
