import {Game} from "./game.js";

export interface GameState {}

export const enum Action {}

export function dispatch(game: Game, action: Action, args: Array<unknown>) {
    switch (action) {
        default:
            break;
    }
}
