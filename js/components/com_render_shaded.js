import { GL_ARRAY_BUFFER, GL_ELEMENT_ARRAY_BUFFER, GL_FLOAT, GL_STATIC_DRAW } from "../webgl.js";
let vaos = new WeakMap();
export function render_shaded(Material, shape, color) {
    return (game, entity) => {
        if (!vaos.has(shape)) {
            // We only need to create the VAO once.
            vaos.set(shape, buffer(game.GL, shape));
        }
        game.World[entity] |= 2048 /* Render */;
        game[11 /* Render */][entity] = {
            Kind: 1 /* Shaded */,
            Material,
            VAO: vaos.get(shape),
            Count: shape.Indices.length,
            Color: color,
        };
    };
}
function buffer(gl, shape) {
    let vao = gl.createVertexArray();
    gl.bindVertexArray(vao);
    gl.bindBuffer(GL_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(GL_ARRAY_BUFFER, shape.Vertices, GL_STATIC_DRAW);
    gl.enableVertexAttribArray(1 /* Position */);
    gl.vertexAttribPointer(1 /* Position */, 3, GL_FLOAT, false, 0, 0);
    gl.bindBuffer(GL_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(GL_ARRAY_BUFFER, shape.Normals, GL_STATIC_DRAW);
    gl.enableVertexAttribArray(2 /* Normal */);
    gl.vertexAttribPointer(2 /* Normal */, 3, GL_FLOAT, false, 0, 0);
    gl.bindBuffer(GL_ELEMENT_ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(GL_ELEMENT_ARRAY_BUFFER, shape.Indices, GL_STATIC_DRAW);
    gl.bindVertexArray(null);
    return vao;
}
//# sourceMappingURL=com_render_shaded.js.map