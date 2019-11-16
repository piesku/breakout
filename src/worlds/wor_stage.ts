import {get_ball_blueprint} from "../blueprints/blu_ball.js";
import {create_brick} from "../blueprints/blu_brick.js";
import {get_paddle_blueprint} from "../blueprints/blu_paddle.js";
import {shake} from "../components/com_shake.js";
import {Game} from "../game.js";

export function world_stage(game: Game) {
    game.World = [];
    game.ClearColor = "black";

    let col_count = 5;
    let row_count = 5;
    let brick_width = 100;
    let brick_height = 20;
    let padding = 10;

    let top_left_x = (game.ViewportWidth - brick_width * col_count - padding * (col_count - 1)) / 2;
    let top_left_y = 100;

    let bricks = [];
    for (let row = 0; row < row_count; row++) {
        let y = top_left_y + row * (brick_height + padding) + brick_height / 2;
        for (let col = 0; col < col_count; col++) {
            let x = top_left_x + col * (brick_width + padding) + brick_width / 2;
            bricks.push({
                Translation: [x, y] as [number, number],
                ...create_brick(brick_width, brick_height, x, y, 0.5 + Math.random()),
            });
        }
    }

    game.Camera = game.Add({
        Using: [shake(0, 10)],
        Children: [
            {
                ...get_paddle_blueprint(game),
            },
            {
                ...get_ball_blueprint(game),
            },
            ...bricks,
        ],
    });

    // setInterval(() => {
    //     let child = game.Add(get_ball_blueprint(game));
    //     game[Get.Transform2D][game.Camera].Children.push(game[Get.Transform2D][child]);
    //     game[Get.Transform2D][child].Parent = game[Get.Transform2D][game.Camera];
    // }, 1000);
}
