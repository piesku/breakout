import {Collide} from "./components/com_collide";
import {Draw} from "./components/com_draw";
import {Move} from "./components/com_move";
import {Transform2D} from "./components/com_transform2d";

export class World {
    public Mask: Array<number> = [];

    public Collide: Array<Collide> = [];
    public Draw: Array<Draw> = [];
    public Move: Array<Move> = [];
    public Transform2D: Array<Transform2D> = [];
}
