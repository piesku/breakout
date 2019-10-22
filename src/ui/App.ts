import {GameState} from "../actions.js";
import {html} from "./html.js";

export function App(state: GameState) {
    return html`
        <div
            style="
                position: absolute;
                top: 0;
                background-color: #000;
                color: #fff;
            "
        ></div>
    `;
}
