import {Vec2} from ".";

export function length(a: Vec2) {
    return Math.hypot(a[0], a[1]);
}

export function distance(a: Vec2, b: Vec2) {
    let x = b[0] - a[0];
    let y = b[1] - a[1];
    return Math.hypot(x, y);
}

export function negate(out: Vec2, a: Vec2) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
}

export function normalize(out: Vec2, a: Vec2) {
    let x = a[0];
    let y = a[1];
    let len = x * x + y * y;
    if (len > 0) {
        len = 1 / Math.sqrt(len);
    }
    out[0] = a[0] * len;
    out[1] = a[1] * len;
    return out;
}
