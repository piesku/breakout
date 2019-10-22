import {Vec2} from ".";

export function length(a: Vec2) {
    return Math.hypot(a[0], a[1]);
}

export function distance(a: Vec2, b: Vec2) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return Math.hypot(x, y);
}
