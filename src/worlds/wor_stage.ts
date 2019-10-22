import {ball_blueprint} from "../blueprints/blu_ball.js";
import {paddle_blueprint} from "../blueprints/blu_paddle.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight - 20],
        ...paddle_blueprint,
    });

    game.Add({
        Translation: [game.ViewportWidth / 2, game.ViewportHeight / 2],
        ...ball_blueprint,
    });
}
