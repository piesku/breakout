export function draw_rect(Width, Height, Color) {
    return (game, entity) => {
        game.World[entity] |= 8 /* Draw */;
        game[3 /* Draw */][entity] = {
            Width,
            Height,
            Color,
        };
    };
}
//# sourceMappingURL=com_draw copy.js.map