(function () {
    'use strict';

    function create() {
        return [1, 0, 0, 1, 0, 0];
    }
    function invert(out, a) {
        let aa = a[0], ab = a[1], ac = a[2], ad = a[3];
        let atx = a[4], aty = a[5];
        let det = aa * ad - ab * ac;
        if (!det) {
            return null;
        }
        det = 1.0 / det;
        out[0] = ad * det;
        out[1] = -ab * det;
        out[2] = -ac * det;
        out[3] = aa * det;
        out[4] = (ac * aty - ad * atx) * det;
        out[5] = (ab * atx - aa * aty) * det;
        return out;
    }
    function multiply(out, a, b) {
        let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
        let b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5];
        out[0] = a0 * b0 + a2 * b1;
        out[1] = a1 * b0 + a3 * b1;
        out[2] = a0 * b2 + a2 * b3;
        out[3] = a1 * b2 + a3 * b3;
        out[4] = a0 * b4 + a2 * b5 + a4;
        out[5] = a1 * b4 + a3 * b5 + a5;
        return out;
    }
    function from_translation(out, v) {
        out[0] = 1;
        out[1] = 0;
        out[2] = 0;
        out[3] = 1;
        out[4] = v[0];
        out[5] = v[1];
        return out;
    }
    function rotate(out, a, rad) {
        let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
        let s = Math.sin(rad);
        let c = Math.cos(rad);
        out[0] = a0 * c + a2 * s;
        out[1] = a1 * c + a3 * s;
        out[2] = a0 * -s + a2 * c;
        out[3] = a1 * -s + a3 * c;
        out[4] = a4;
        out[5] = a5;
        return out;
    }
    function scale(out, a, v) {
        let a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5];
        let v0 = v[0], v1 = v[1];
        out[0] = a0 * v0;
        out[1] = a1 * v0;
        out[2] = a2 * v1;
        out[3] = a3 * v1;
        out[4] = a4;
        out[5] = a5;
        return out;
    }
    function get_translation(out, a) {
        out[0] = a[4];
        out[1] = a[5];
        return out;
    }

    function transform2d(Translation = [0, 0], Rotation = 0, Scale = [1, 1]) {
        return (game, EntityId) => {
            game.World[EntityId] |= 64 /* Transform2D */;
            game[6 /* Transform2D */][EntityId] = {
                EntityId,
                World: create(),
                Self: create(),
                Translation,
                Rotation,
                Scale,
                Children: [],
                Dirty: true,
            };
        };
    }

    function add(out, a, b) {
        out[0] = a[0] + b[0];
        out[1] = a[1] + b[1];
        return out;
    }
    function negate(out, a) {
        out[0] = -a[0];
        out[1] = -a[1];
        return out;
    }
    function normalize(out, a) {
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

    const QUERY = 64 /* Transform2D */ | 1 /* Collide */;
    function sys_collide(game, delta) {
        // Collect all colliders.
        let all_colliders = [];
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY) === QUERY) {
                let transform = game[6 /* Transform2D */][i];
                let collider = game[0 /* Collide */][i];
                // Prepare the collider for this tick.
                collider.Collisions = [];
                compute_aabb(transform, collider);
                all_colliders.push(collider);
            }
        }
        for (let i = 0; i < all_colliders.length; i++) {
            check_collisions(all_colliders[i], all_colliders);
        }
    }
    function compute_aabb(transform, collide) {
        get_translation(collide.Center, transform.World);
        collide.Min[0] = collide.Center[0] - collide.Size[0] / 2;
        collide.Min[1] = collide.Center[1] - collide.Size[1] / 2;
        collide.Max[0] = collide.Center[0] + collide.Size[0] / 2;
        collide.Max[1] = collide.Center[1] + collide.Size[1] / 2;
    }
    function check_collisions(collider, colliders) {
        for (let i = 0; i < colliders.length; i++) {
            let other = colliders[i];
            if (other !== collider && intersect_aabb(collider, other)) {
                let hit = penetrate_aabb(collider, other);
                collider.Collisions.push({
                    Other: other,
                    Hit: hit,
                });
                other.Collisions.push({
                    Other: collider,
                    Hit: negate([0, 0], hit),
                });
            }
        }
    }
    function penetrate_aabb(a, b) {
        let distance_x = a.Center[0] - b.Center[0];
        let penetration_x = a.Size[0] / 2 + b.Size[0] / 2 - Math.abs(distance_x);
        let distance_y = a.Center[1] - b.Center[1];
        let penetration_y = a.Size[1] / 2 + b.Size[1] / 2 - Math.abs(distance_y);
        if (penetration_x < penetration_y) {
            return [penetration_x * Math.sign(distance_x), 0];
        }
        else {
            return [0, penetration_y * Math.sign(distance_y)];
        }
    }
    function intersect_aabb(a, b) {
        return a.Min[0] < b.Max[0] && a.Max[0] > b.Min[0] && a.Min[1] < b.Max[1] && a.Max[1] > b.Min[1];
    }

    const QUERY$1 = 64 /* Transform2D */ | 2 /* ControlBall */ | 32 /* Move */ | 1 /* Collide */;
    function sys_control_ball(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$1) == QUERY$1) {
                update(game, i);
            }
        }
    }
    function update(game, entity) {
        let control = game[1 /* ControlBall */][entity];
        let transform = game[6 /* Transform2D */][entity];
        if (transform.Translation[0] < 0) {
            transform.Translation[0] = 0;
            control.Direction[0] = -control.Direction[0];
        }
        if (transform.Translation[0] > game.ViewportWidth) {
            transform.Translation[0] = game.ViewportWidth;
            control.Direction[0] = -control.Direction[0];
        }
        if (transform.Translation[1] < 0) {
            transform.Translation[1] = 0;
            control.Direction[1] = -control.Direction[1];
        }
        if (transform.Translation[1] > game.ViewportHeight) {
            transform.Translation[1] = game.ViewportHeight;
            control.Direction[1] = -control.Direction[1];
        }
        let collide = game[0 /* Collide */][entity];
        if (collide.Collisions.length > 0) {
            let collision = collide.Collisions[0];
            if (collision.Hit[0]) {
                transform.Translation[0] += collision.Hit[0];
                control.Direction[0] = -control.Direction[0];
            }
            if (collision.Hit[1]) {
                transform.Translation[1] += collision.Hit[1];
                control.Direction[1] = -control.Direction[1];
            }
            if (game.World[collision.Other.EntityId] & 32 /* Move */) {
                let move = game[5 /* Move */][collision.Other.EntityId];
                control.Direction[0] += move.Direction[0];
                control.Direction[1] += move.Direction[1];
            }
        }
        let move = game[5 /* Move */][entity];
        move.Direction[0] = control.Direction[0];
        move.Direction[1] = control.Direction[1];
        normalize(move.Direction, move.Direction);
    }

    const QUERY$2 = 4 /* ControlBrick */ | 1 /* Collide */;
    function sys_control_brick(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$2) === QUERY$2) {
                update$1(game, i);
            }
        }
    }
    function update$1(game, entity) {
        let collide = game[0 /* Collide */][entity];
        if (collide.Collisions.length > 0) {
            game.Destroy(entity);
        }
    }

    const QUERY$3 = 8 /* ControlPaddle */ | 32 /* Move */;
    function sys_control_paddle(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$3) == QUERY$3) {
                update$2(game, i);
            }
        }
    }
    function update$2(game, entity) {
        let move = game[5 /* Move */][entity];
        move.Direction[0] = 0;
        move.Direction[1] = 0;
        if (game.InputState.ArrowLeft) {
            add(move.Direction, move.Direction, [-1, 0]);
        }
        if (game.InputState.ArrowRight) {
            add(move.Direction, move.Direction, [1, 0]);
        }
        if (game.InputState.ArrowUp) {
            add(move.Direction, move.Direction, [0, -1]);
        }
        if (game.InputState.ArrowDown) {
            add(move.Direction, move.Direction, [0, 1]);
        }
        normalize(move.Direction, move.Direction);
    }

    const QUERY$4 = 64 /* Transform2D */ | 16 /* Draw */;
    function sys_draw2d(game, delta) {
        game.Context2D.resetTransform();
        game.Context2D.clearRect(0, 0, game.ViewportWidth, game.ViewportHeight);
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$4) == QUERY$4) {
                let transform = game[6 /* Transform2D */][i];
                game.Context2D.setTransform(transform.World[0], transform.World[1], transform.World[2], transform.World[3], transform.World[4], transform.World[5]);
                draw_rect(game, i);
            }
        }
    }
    function draw_rect(game, entity) {
        let draw = game[4 /* Draw */][entity];
        game.Context2D.fillStyle = draw.Color;
        game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
    }

    let tick_span = document.getElementById("tick");
    let fps_span = document.getElementById("fps");
    function sys_framerate(game, delta) {
        if (tick_span) {
            tick_span.textContent = (delta * 1000).toFixed(1);
        }
        if (fps_span) {
            fps_span.textContent = (1 / delta).toFixed();
        }
    }

    const QUERY$5 = 64 /* Transform2D */ | 32 /* Move */;
    function sys_move(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$5) == QUERY$5) {
                update$3(game, i, delta);
            }
        }
    }
    function update$3(game, entity, delta) {
        let transform = game[6 /* Transform2D */][entity];
        let move = game[5 /* Move */][entity];
        transform.Translation[0] += move.Direction[0] * move.Speed * delta;
        transform.Translation[1] += move.Direction[1] * move.Speed * delta;
        transform.Dirty = true;
    }

    function sys_performance(game, delta, target) {
        if (target) {
            target.textContent = delta.toFixed(1);
        }
    }

    const QUERY$6 = 64 /* Transform2D */;
    function sys_transform2d(game, delta) {
        for (let i = 0; i < game.World.length; i++) {
            if ((game.World[i] & QUERY$6) === QUERY$6) {
                update$4(game[6 /* Transform2D */][i]);
            }
        }
    }
    function update$4(transform) {
        if (transform.Dirty) {
            transform.Dirty = false;
            set_children_as_dirty(transform);
            from_translation(transform.World, transform.Translation);
            rotate(transform.World, transform.World, transform.Rotation);
            scale(transform.World, transform.World, transform.Scale);
            if (transform.Parent) {
                multiply(transform.World, transform.Parent.World, transform.World);
            }
            invert(transform.Self, transform.World);
        }
    }
    function set_children_as_dirty(transform) {
        for (let child of transform.Children) {
            child.Dirty = true;
            set_children_as_dirty(child);
        }
    }

    var _a, _b, _c, _d, _e, _f, _g;
    const MAX_ENTITIES = 10000;
    class Game {
        constructor() {
            this.World = [];
            // Implement ComponentData
            this[_a] = [];
            this[_b] = [];
            this[_c] = [];
            this[_d] = [];
            this[_e] = [];
            this[_f] = [];
            this[_g] = [];
            this.ViewportWidth = window.innerWidth;
            this.ViewportHeight = window.innerHeight;
            this.UI = document.querySelector("main");
            this.InputState = { mouse_x: 0, mouse_y: 0 };
            this.InputEvent = { mouse_x: 0, mouse_y: 0, wheel_y: 0 };
            this.RAF = 0;
            document.addEventListener("visibilitychange", () => document.hidden ? this.Stop() : this.Start());
            window.addEventListener("keydown", evt => (this.InputState[evt.code] = 1));
            window.addEventListener("keyup", evt => (this.InputState[evt.code] = 0));
            this.UI.addEventListener("contextmenu", evt => evt.preventDefault());
            this.UI.addEventListener("mousedown", evt => {
                this.InputState[`mouse_${evt.button}`] = 1;
                this.InputEvent[`mouse_${evt.button}_down`] = 1;
            });
            this.UI.addEventListener("mouseup", evt => {
                this.InputState[`mouse_${evt.button}`] = 0;
                this.InputEvent[`mouse_${evt.button}_up`] = 1;
            });
            this.UI.addEventListener("mousemove", evt => {
                this.InputState.mouse_x = evt.offsetX;
                this.InputState.mouse_y = evt.offsetY;
                this.InputEvent.mouse_x = evt.movementX;
                this.InputEvent.mouse_y = evt.movementY;
            });
            this.UI.addEventListener("wheel", evt => {
                this.InputEvent.wheel_y = evt.deltaY;
            });
            let canvas2d = document.querySelector("canvas");
            canvas2d.width = this.ViewportWidth;
            canvas2d.height = this.ViewportHeight;
            this.Context2D = canvas2d.getContext("2d");
        }
        CreateEntity(mask = 0) {
            for (let i = 0; i < MAX_ENTITIES; i++) {
                if (!this.World[i]) {
                    this.World[i] = mask;
                    return i;
                }
            }
            throw new Error("No more entities available.");
        }
        Update(delta) {
            let now = performance.now();
            sys_control_paddle(this);
            sys_control_ball(this);
            sys_control_brick(this);
            sys_move(this, delta);
            sys_transform2d(this);
            sys_collide(this);
            sys_draw2d(this);
            // Performance.
            sys_framerate(this, delta);
            sys_performance(this, performance.now() - now, document.querySelector("#frame"));
        }
        Start() {
            let last = performance.now();
            let tick = (now) => {
                let delta = (now - last) / 1000;
                this.Update(delta);
                // Reset all input events for the next frame.
                for (let name in this.InputEvent) {
                    this.InputEvent[name] = 0;
                }
                last = now;
                this.RAF = requestAnimationFrame(tick);
            };
            this.Stop();
            tick(last);
        }
        Stop() {
            cancelAnimationFrame(this.RAF);
        }
        Add({ Translation, Rotation, Scale, Using = [], Children = [] }) {
            let entity = this.CreateEntity();
            transform2d(Translation, Rotation, Scale)(this, entity);
            for (let mixin of Using) {
                mixin(this, entity);
            }
            let entity_transform = this[6 /* Transform2D */][entity];
            for (let subtree of Children) {
                let child = this.Add(subtree);
                let child_transform = this[6 /* Transform2D */][child];
                child_transform.Parent = entity_transform;
                entity_transform.Children.push(child_transform);
            }
            return entity;
        }
        Destroy(entity) {
            let mask = this.World[entity];
            if (mask & 64 /* Transform2D */) {
                for (let child of this[6 /* Transform2D */][entity].Children) {
                    this.Destroy(child.EntityId);
                }
            }
            this.World[entity] = 0;
        }
    }
    _a = 0 /* Collide */, _b = 1 /* ControlBall */, _c = 2 /* ControlBrick */, _d = 3 /* ControlPaddle */, _e = 4 /* Draw */, _f = 5 /* Move */, _g = 6 /* Transform2D */;

    function collide(Size) {
        return (game, EntityId) => {
            game.World[EntityId] |= 1 /* Collide */;
            game[0 /* Collide */][EntityId] = {
                EntityId,
                Size,
                Min: [0, 0],
                Max: [0, 0],
                Center: [0, 0],
                Collisions: [],
            };
        };
    }

    function control_ball(angle) {
        return (game, entity) => {
            game.World[entity] |= 2 /* ControlBall */;
            game[1 /* ControlBall */][entity] = {
                Direction: [Math.cos(angle), Math.sin(angle)],
            };
        };
    }

    function control_brick() {
        return (game, entity) => {
            game.World[entity] |= 4 /* ControlBrick */;
            game[2 /* ControlBrick */][entity] = {};
        };
    }

    function control_paddle() {
        return (game, entity) => {
            game.World[entity] |= 8 /* ControlPaddle */;
            game[3 /* ControlPaddle */][entity] = {};
        };
    }

    function draw_rect$1(Width, Height, Color) {
        return (game, entity) => {
            game.World[entity] |= 16 /* Draw */;
            game[4 /* Draw */][entity] = {
                Width,
                Height,
                Color,
            };
        };
    }

    function move(Speed) {
        return (game, entity) => {
            game.World[entity] |= 32 /* Move */;
            game[5 /* Move */][entity] = {
                Direction: [0, 0],
                Speed,
            };
        };
    }

    function world_three(game) {
        game.World = [];
        game.Add({
            Translation: [game.ViewportWidth / 2, game.ViewportHeight - 20],
            Using: [control_paddle(), move(500), collide([100, 20]), draw_rect$1(100, 20, "red")],
        });
        game.Add({
            Translation: [game.ViewportWidth / 2, game.ViewportHeight - 50],
            Using: [
                control_ball(Math.random() * Math.PI * -1),
                move(300),
                collide([20, 20]),
                draw_rect$1(20, 20, "orange"),
            ],
        });
        let col_count = 5;
        let row_count = 5;
        let brick_width = 100;
        let brick_height = 20;
        let padding = 10;
        let top_left_x = (game.ViewportWidth - brick_width * col_count - padding * (col_count - 1)) / 2;
        let top_left_y = 50;
        for (let row = 0; row < row_count; row++) {
            let y = top_left_y + row * (brick_height + padding) + brick_height / 2;
            for (let col = 0; col < col_count; col++) {
                let x = top_left_x + col * (brick_width + padding) + brick_width / 2;
                game.Add({
                    Translation: [x, y],
                    Using: [
                        control_brick(),
                        collide([brick_width, brick_height]),
                        draw_rect$1(brick_width, brick_height, "green"),
                    ],
                });
            }
        }
    }

    let game = new Game();
    world_three(game);
    game.Start();
    // @ts-ignore
    window.game = game;

}());
