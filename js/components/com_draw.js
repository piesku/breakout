export function draw_marker(Marker) {
    return (game, entity) => {
        game.World[entity] |= 32 /* Draw */;
        game[5 /* Draw */][entity] = {
            Kind: 0 /* Marker */,
            Marker,
        };
    };
}
export function draw_rect(Width, Height, Color) {
    return (game, entity) => {
        game.World[entity] |= 32 /* Draw */;
        game[5 /* Draw */][entity] = {
            Kind: 1 /* Rect */,
            Width,
            Height,
            Color,
        };
    };
}
//# sourceMappingURL=com_draw.js.map