import {GameState} from "./actions.js";
import {Blueprint2D} from "./blueprints/blu_common.js";
import {AudioSource} from "./components/com_audio_source.js";
import {Collide} from "./components/com_collide.js";
import {ControlBall} from "./components/com_control_ball.js";
import {ControlBrick} from "./components/com_control_brick.js";
import {ControlPaddle} from "./components/com_control_paddle.js";
import {Draw} from "./components/com_draw.js";
import {Entry} from "./components/com_entry.js";
import {Fade} from "./components/com_fade.js";
import {ComponentData, Get, Has} from "./components/com_index.js";
import {Move} from "./components/com_move.js";
import {Named} from "./components/com_named.js";
import {Shake} from "./components/com_shake.js";
import {Transform2D, transform2d} from "./components/com_transform2d.js";
import {Vec4} from "./math/index.js";
import {sys_audio} from "./systems/sys_audio.js";
import {sys_collide} from "./systems/sys_collide.js";
import {sys_control_ball} from "./systems/sys_control_ball.js";
import {sys_control_brick} from "./systems/sys_control_brick.js";
import {sys_control_paddle} from "./systems/sys_control_paddle.js";
import {sys_draw2d} from "./systems/sys_draw2d.js";
import {sys_entry} from "./systems/sys_entry.js";
import {sys_fade} from "./systems/sys_fade.js";
import {sys_framerate} from "./systems/sys_framerate.js";
import {sys_move} from "./systems/sys_move.js";
import {sys_performance} from "./systems/sys_performance.js";
import {sys_shake} from "./systems/sys_shake.js";
import {sys_transform2d} from "./systems/sys_transform2d.js";
import {sys_ui} from "./systems/sys_ui.js";

const MAX_ENTITIES = 10000;

export type Entity = number;

export interface InputState {
    [k: string]: number;
    mouse_x: number;
    mouse_y: number;
}

export interface InputEvent {
    [k: string]: number;
    mouse_x: number;
    mouse_y: number;
    wheel_y: number;
}

export class Game implements ComponentData, GameState {
    public World: Array<number> = [];

    // Implement ComponentData
    public [Get.AudioSource]: Array<AudioSource> = [];
    public [Get.Collide]: Array<Collide> = [];
    public [Get.ControlBall]: Array<ControlBall> = [];
    public [Get.ControlBrick]: Array<ControlBrick> = [];
    public [Get.ControlPaddle]: Array<ControlPaddle> = [];
    public [Get.Draw]: Array<Draw> = [];
    public [Get.Move]: Array<Move> = [];
    public [Get.Named]: Array<Named> = [];
    public [Get.Transform2D]: Array<Transform2D> = [];
    public [Get.Shake]: Array<Shake> = [];
    public [Get.Fade]: Array<Fade> = [];
    public [Get.Entry]: Array<Entry> = [];

    public ViewportWidth = window.innerWidth;
    public ViewportHeight = window.innerHeight;
    public Context2D: CanvasRenderingContext2D;
    public UI = document.querySelector("main")!;
    public Audio: AudioContext = new AudioContext();
    public InputState: InputState = {mouse_x: 0, mouse_y: 0};
    public InputEvent: InputEvent = {mouse_x: 0, mouse_y: 0, wheel_y: 0};
    public Camera: Entity = 0;

    // Implement GameState
    public ClearColor = <Vec4>[1, 0.3, 0.3, 1];

    private RAF: number = 0;

    constructor() {
        document.addEventListener("visibilitychange", () =>
            document.hidden ? this.Stop() : this.Start()
        );

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
        this.UI.addEventListener("click", () => this.UI.requestPointerLock());

        let canvas2d = document.querySelector("canvas")! as HTMLCanvasElement;
        canvas2d.width = this.ViewportWidth;
        canvas2d.height = this.ViewportHeight;
        this.Context2D = canvas2d.getContext("2d")!;
    }

    CreateEntity(mask: number = 0) {
        for (let i = 0; i < MAX_ENTITIES; i++) {
            if (!this.World[i]) {
                this.World[i] = mask;
                return i;
            }
        }
        throw new Error("No more entities available.");
    }

    Update(delta: number) {
        let now = performance.now();

        sys_control_paddle(this, delta);
        sys_control_ball(this, delta);
        sys_control_brick(this, delta);
        sys_shake(this, delta);
        sys_fade(this, delta);
        sys_entry(this, delta);
        sys_move(this, delta);
        sys_transform2d(this, delta);
        sys_collide(this, delta);
        sys_audio(this, delta);
        sys_draw2d(this, delta);
        sys_ui(this, delta);

        // Performance.
        sys_framerate(this, delta);
        sys_performance(this, performance.now() - now, document.querySelector("#frame"));
    }

    Start() {
        let last = performance.now();

        let tick = (now: number) => {
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
        this.Audio.resume();
        tick(last);
    }

    Stop() {
        this.Audio.suspend();
        cancelAnimationFrame(this.RAF);
    }

    Add({Translation, Rotation, Scale, Using = [], Children = []}: Blueprint2D) {
        let entity = this.CreateEntity();
        transform2d(Translation, Rotation, Scale)(this, entity);
        for (let mixin of Using) {
            mixin(this, entity);
        }
        let entity_transform = this[Get.Transform2D][entity];
        for (let subtree of Children) {
            let child = this.Add(subtree);
            let child_transform = this[Get.Transform2D][child];
            child_transform.Parent = entity_transform;
            entity_transform.Children.push(child_transform);
        }
        return entity;
    }

    Destroy(entity: Entity) {
        let mask = this.World[entity];
        if (mask & Has.Transform2D) {
            for (let child of this[Get.Transform2D][entity].Children) {
                this.Destroy(child.EntityId);
            }
        }
        this.World[entity] = 0;
    }
}
