import {draw_rect} from "../components/com_draw.js";
import {fade} from "../components/com_fade.js";
import {move} from "../components/com_move.js";
import {Blueprint2D} from "./blu_common.js";

export let get_blu_explosion = function(x: number, y: number, color: string, frames_alive: number) {
    let number_of_explosions = 32;
    let Children = [];
    let step = (Math.PI * 2) / number_of_explosions;
    let fade_step = 1 / frames_alive;

    for (let i = 0; i < number_of_explosions; i++) {
        Children.push(<Blueprint2D>{
            Using: [draw_rect(20, 20, color), move(step * i, 1000), fade(fade_step)],
        });
    }
    return <Blueprint2D>{
        Translation: [x, y],
        Children,
    };
};
