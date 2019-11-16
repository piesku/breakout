import {get_ball_blueprint} from "../blueprints/blu_ball.js";
import {get_blu_explosion} from "../blueprints/blu_explosion.js";
import {get_blu_tail} from "../blueprints/blu_tail.js";
import {Get, Has} from "../components/com_index.js";
import {Entity, Game} from "../game.js";
import {normalize} from "../math/vec2.js";
import {snd_bounce_brick} from "../sounds/snd_bounce_brick.js";
import {snd_bounce_paddle} from "../sounds/snd_bounce_paddle.js";
import {snd_bounce_wall} from "../sounds/snd_bounce_wall.js";

const QUERY = Has.Transform2D | Has.ControlBall | Has.Move | Has.Collide | Has.AudioSource;

export function sys_control_ball(game: Game, delta: number) {
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) === QUERY) {
            update(game, i);
        }
    }
}

function update(game: Game, entity: Entity) {
    let transform = game[Get.Transform2D][entity];
    let move = game[Get.Move][entity];
    let collide = game[Get.Collide][entity];
    let audio = game[Get.AudioSource][entity];

    if (transform.Translation[0] < 0) {
        transform.Translation[0] = 0;
        move.Direction[0] = -move.Direction[0];
        audio.Trigger = snd_bounce_wall;
        audio.HalfTones = 0;
    }

    if (transform.Translation[0] > game.ViewportWidth) {
        transform.Translation[0] = game.ViewportWidth;
        move.Direction[0] = -move.Direction[0];
        audio.Trigger = snd_bounce_wall;
        audio.HalfTones = 0;
    }

    if (transform.Translation[1] < 0) {
        transform.Translation[1] = 0;
        move.Direction[1] = -move.Direction[1];
        audio.Trigger = snd_bounce_wall;
        audio.HalfTones = 0;
    }

    if (transform.Translation[1] > game.ViewportHeight) {
        transform.Translation[1] = game.ViewportHeight;
        move.Direction[1] = -move.Direction[1];
        audio.Trigger = snd_bounce_wall;
        audio.HalfTones = 0;
    }

    if (collide.Collisions.length > 0) {
        game[Get.Shake][game.Camera].Duration = 0.2;

        let collision = collide.Collisions[0];
        if (collision.Hit[0]) {
            transform.Translation[0] += collision.Hit[0];
            let from_center = collide.Center[1] - collision.Other.Center[1];
            let other_half = collision.Other.Size[1] / 2;
            move.Direction[0] = -move.Direction[0];
            move.Direction[1] = from_center / other_half;
        }
        if (collision.Hit[1]) {
            transform.Translation[1] += collision.Hit[1];
            let from_center = collide.Center[0] - collision.Other.Center[0];
            let other_half = collision.Other.Size[0] / 2;
            move.Direction[0] = from_center / other_half;
            move.Direction[1] = -move.Direction[1];
        }

        if (game.World[collision.Other.EntityId] & Has.ControlBrick) {
            let control = game[Get.ControlBall][entity];
            control.Bounces += 1;
            audio.Trigger = snd_bounce_brick;
            audio.HalfTones = control.Bounces;
        }

        if (game.World[collision.Other.EntityId] & Has.ControlPaddle) {
            let control = game[Get.ControlBall][entity];
            control.Bounces = 0;
            audio.Trigger = snd_bounce_paddle;
            audio.HalfTones = 0;
        }

        normalize(move.Direction, move.Direction);

        game.Add(
            get_blu_explosion(transform.Translation[0], transform.Translation[1], "white", 15)
        );

        if (Math.random() > 0.95) {
            let child = game.Add({
                ...get_ball_blueprint(game),
                Translation: [transform.Translation[0], transform.Translation[1]],
            });
            game[Get.Transform2D][game.Camera].Children.push(game[Get.Transform2D][child]);
            game[Get.Transform2D][child].Parent = game[Get.Transform2D][game.Camera];
        }
    }

    let angle = Math.atan(move.Direction[1] / move.Direction[0]);

    transform.Rotation = angle;

    game.Add({
        ...get_blu_tail(20, 20, "orange"),
        Translation: [...transform.Translation] as [number, number],
        Rotation: angle,
    });
}
