const QUERY = 16 /* Transform2D */ | 4 /* Draw */;
export function sys_draw2d(game, delta) {
    game.Context2D.resetTransform();
    game.Context2D.clearRect(0, 0, game.ViewportWidth, game.ViewportHeight);
    for (let i = 0; i < game.World.length; i++) {
        if ((game.World[i] & QUERY) == QUERY) {
            let transform = game[4 /* Transform2D */][i];
            game.Context2D.setTransform(transform.World[0], transform.World[1], transform.World[2], transform.World[3], transform.World[4], transform.World[5]);
            let draw = game[2 /* Draw */][i];
            switch (draw.Kind) {
                case 1 /* Rect */:
                    draw_rect(game, draw);
                    break;
            }
        }
    }
}
function draw_rect(game, draw) {
    game.Context2D.fillStyle = draw.Color;
    game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
}
//# sourceMappingURL=sys_draw2d copy.js.map