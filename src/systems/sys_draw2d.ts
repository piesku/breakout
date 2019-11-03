import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";

const QUERY = Has.Transform2D | Has.Draw;

export function sys_draw2d(game: Game, delta: number) {
    game.Context2D.resetTransform();
    game.Context2D.clearRect(0, 0, game.ViewportWidth, game.ViewportHeight);

    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            let transform = game[Get.Transform2D][i];
            game.Context2D.setTransform(
                transform.World[0],
                transform.World[1],
                transform.World[2],
                transform.World[3],
                transform.World[4],
                transform.World[5]
            );

            draw_rect(game, i);
        }
    }
}

function draw_rect(game: Game, entity: Entity) {
    let draw = game[Get.Draw][entity];
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
}
