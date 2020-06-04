(function () {


function dispatch(game, action, args) {
}

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
game.World[EntityId] |= 256 /* Transform2D */;
game[8 /* Transform2D */][EntityId] = {
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

function play_note(audio, instr, note, offset) {
let time = audio.currentTime + offset;
let total_duration = 0;
let master = audio.createGain();
master.gain.value = (instr[0 /* MasterGainAmount */] / 9) ** 3;
let lfa, lfo;
if (instr[5 /* LFOType */]) {

lfo = audio.createOscillator();
lfo.type = instr[5 /* LFOType */];
lfo.frequency.value = (instr[7 /* LFOFreq */] / 3) ** 3;

lfa = audio.createGain();
lfa.gain.value = (instr[6 /* LFOAmount */] + 3) ** 3;
lfo.connect(lfa);
}
if (instr[1 /* FilterType */]) {
let filter = audio.createBiquadFilter();
filter.type = instr[1 /* FilterType */];
filter.frequency.value = 2 ** instr[2 /* FilterFreq */];
filter.Q.value = instr[3 /* FilterQ */] ** 1.5;
if (lfa && instr[4 /* FilterDetuneLFO */]) {
lfa.connect(filter.detune);
}
master.connect(filter);
filter.connect(audio.destination);
}
else {
master.connect(audio.destination);
}
for (let source of instr[8 /* Sources */]) {
let amp = audio.createGain();
amp.connect(master);

let gain_amount = (source[1 /* GainAmount */] / 9) ** 3;
let gain_attack = (source[2 /* GainAttack */] / 9) ** 3;
let gain_sustain = (source[3 /* GainSustain */] / 9) ** 3;
let gain_release = (source[4 /* GainRelease */] / 6) ** 3;
let gain_duration = gain_attack + gain_sustain + gain_release;
amp.gain.setValueAtTime(0, time);
amp.gain.linearRampToValueAtTime(gain_amount, time + gain_attack);
amp.gain.setValueAtTime(gain_amount, time + gain_attack + gain_sustain);
amp.gain.exponentialRampToValueAtTime(0.00001, time + gain_duration);

if (source[0]) {
let hfo = audio.createOscillator();
hfo.type = source[0 /* SourceType */];
hfo.connect(amp);


hfo.detune.value = 3 * (source[5 /* DetuneAmount */] - 7.5) ** 3;
if (lfa && source[6 /* DetuneLFO */]) {
lfa.connect(hfo.detune);
}


let freq = 440 * 2 ** ((note - 69) / 12);
if (source[7 /* FreqEnabled */]) {
let freq_attack = (source[8 /* FreqAttack */] / 9) ** 3;
let freq_sustain = (source[9 /* FreqSustain */] / 9) ** 3;
let freq_release = (source[10 /* FreqRelease */] / 6) ** 3;
hfo.frequency.linearRampToValueAtTime(0, time);
hfo.frequency.linearRampToValueAtTime(freq, time + freq_attack);
hfo.frequency.setValueAtTime(freq, time + freq_attack + freq_sustain);
hfo.frequency.exponentialRampToValueAtTime(0.00001, time + freq_attack + freq_sustain + freq_release);
}
else {
hfo.frequency.setValueAtTime(freq, time);
}
hfo.start(time);
hfo.stop(time + gain_duration);
}
else {
let noise = audio.createBufferSource();
noise.buffer = lazy_noise_buffer(audio);
noise.loop = true;
noise.connect(amp);
noise.start(time);
noise.stop(time + gain_duration);
}
if (gain_duration > total_duration) {
total_duration = gain_duration;
}
}
if (lfo) {
lfo.start(time);
lfo.stop(time + total_duration);
}
}
let noise_buffer;
function lazy_noise_buffer(audio) {
if (!noise_buffer) {
noise_buffer = audio.createBuffer(1, audio.sampleRate * 2, audio.sampleRate);
let channel = noise_buffer.getChannelData(0);
for (let i = 0; i < channel.length; i++) {
channel[i] = Math.random() * 2 - 1;
}
}
return noise_buffer;
}

const QUERY = 1 /* AudioSource */;
function sys_audio(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY) === QUERY) {
update(game, i, delta);
}
}
}
function update(game, entity, delta) {
let audio_source = game[0 /* AudioSource */][entity];
let can_exit = !audio_source.Current || audio_source.Time > audio_source.Current.Exit;
if (audio_source.Trigger && can_exit) {

let spb = 60 / (audio_source.Trigger.BPM || 120);

let interval = spb / 4;
for (let track of audio_source.Trigger.Tracks) {
for (let i = 0; i < track.Notes.length; i++) {
if (track.Notes[i]) {
play_note(game.Audio, track.Instrument, track.Notes[i] + audio_source.HalfTones, i * interval);
}
}
}
audio_source.Current = audio_source.Trigger;
audio_source.Time = 0;
}
else {
audio_source.Time += delta;
}




audio_source.Trigger = audio_source.Idle;
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
function lerp(out, a, b, t) {
let ax = a[0];
let ay = a[1];
out[0] = ax + t * (b[0] - ax);
out[1] = ay + t * (b[1] - ay);
return out;
}

const QUERY$1 = 256 /* Transform2D */ | 2 /* Collide */;
function sys_collide(game, delta) {

let static_colliders = [];
let dynamic_colliders = [];
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$1) === QUERY$1) {
let transform = game[8 /* Transform2D */][i];
let collider = game[1 /* Collide */][i];

collider.Collisions = [];
if (collider.New) {
collider.New = false;
compute_aabb(transform, collider);
}
else if (collider.Dynamic) {
compute_aabb(transform, collider);
dynamic_colliders.push(collider);
}
else {
static_colliders.push(collider);
}
}
}
for (let i = 0; i < dynamic_colliders.length; i++) {
check_collisions(dynamic_colliders[i], static_colliders, static_colliders.length);
check_collisions(dynamic_colliders[i], dynamic_colliders, i);
}
}
function compute_aabb(transform, collide) {
get_translation(collide.Center, transform.World);
collide.Min[0] = collide.Center[0] - collide.Size[0] / 2;
collide.Min[1] = collide.Center[1] - collide.Size[1] / 2;
collide.Max[0] = collide.Center[0] + collide.Size[0] / 2;
collide.Max[1] = collide.Center[1] + collide.Size[1] / 2;
}
/**
* Check for collisions between a dynamic collider and other colliders. Length
* is used to control how many colliders to check against. For collisions
* with static colliders, length should be equal to colliders.length, since
* we want to consider all static colliders in the scene. For collisions with
* other dynamic colliders, we only need to check a pair of colliders once.
* Varying length allows to skip half of the NxN checks matrix.
*
* @param game The game instance.
* @param collider The current collider.
* @param colliders Other colliders to test against.
* @param length How many colliders to check.
*/
function check_collisions(collider, colliders, length) {
for (let i = 0; i < length; i++) {
let other = colliders[i];
if (intersect_aabb(collider, other)) {
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

/**
* Add the AudioSource component.
*
* @param idle The name of the clip to play by default, in a loop.
*/
function audio_source(idle) {
return (game, entity) => {
game.World[entity] |= 1 /* AudioSource */;
game[0 /* AudioSource */][entity] = {
Idle: idle,
Time: 0,
HalfTones: 0,
};
};
}

function collide(Dynamic = true, Size) {
return (game, EntityId) => {
game.World[EntityId] |= 2 /* Collide */;
game[1 /* Collide */][EntityId] = {
EntityId,
New: true,
Dynamic,
Size,
Min: [0, 0],
Max: [0, 0],
Center: [0, 0],
Collisions: [],
};
};
}

function control_ball() {
return (game, entity) => {
game.World[entity] |= 4 /* ControlBall */;
game[2 /* ControlBall */][entity] = {
Bounces: 0,
};
};
}

function draw_rect(Width, Height, Color, Alpha = 1, Filter = "none") {
return (game, entity) => {
game.World[entity] |= 32 /* Draw */;
game[5 /* Draw */][entity] = {
Kind: 1 /* Rect */,
Width,
Height,
Color,
Alpha,
Filter,
};
};
}

function move(angle, Speed) {
return (game, entity) => {
game.World[entity] |= 64 /* Move */;
game[6 /* Move */][entity] = {
Direction: [Math.cos(angle), Math.sin(angle)],
Speed,
};
};
}

let get_ball_blueprint = function (game) {
let x = game.ViewportWidth / 2;
let y = game.ViewportHeight - 100;
return {
Translation: [x, y],
Using: [
control_ball(),
move(Math.PI * 1.75, 500),
collide(true, [20, 20]),
draw_rect(20, 20, "orange"),
audio_source(),
],
};
};

function fade(Step = 0.1) {
return (game, entity) => {
game.World[entity] |= 1024 /* Fade */;
game[10 /* Fade */][entity] = {
Step,
};
};
}

let get_blu_explosion = function (x, y, color, frames_alive) {
let number_of_explosions = 32;
let Children = [];
let step = (Math.PI * 2) / number_of_explosions;
let fade_step = 1 / frames_alive;
for (let i = 0; i < number_of_explosions; i++) {
Children.push({
Using: [draw_rect(20, 20, color), move(step * i, 1000), fade(fade_step)],
});
}
return {
Translation: [x, y],
Children,
};
};

let get_blu_tail = function (width, height, color) {
return {
Using: [draw_rect(width, height, color), fade(0.05)],
};
};

let snd_bounce_brick = {
Tracks: [
{
Instrument: [
4,
"lowpass",
11,
8,
false,
false,
8,
8,
[
["sine", 5, 1, 2, 4, 8, false, false, 8, 8, 8],
["triangle", 4, 2, 2, 7, 10, false, false, 8, 8, 7],
],
],
Notes: [72],
},
],
Exit: 0,
};

let snd_bounce_paddle = {
Tracks: [
{
Instrument: [
4,
"lowpass",
11,
4,
false,
false,
8,
3,
[["triangle", 8, 1, 2, 9, 8, false, true, 0, 2, 10], [false, 5, 1, 1, 4]],
],
Notes: [69],
},
],
Exit: 0,
};

let snd_bounce_wall = {
Tracks: [
{
Instrument: [
4,
"lowpass",
8,
8,
false,
false,
8,
8,
[["sine", 8, 2, 2, 3, 8, false, false, 8, 8, 8], [false, 3, 1, 2, 6]],
],
Notes: [64],
},
],
Exit: 0,
};

const QUERY$2 = 256 /* Transform2D */ | 4 /* ControlBall */ | 64 /* Move */ | 2 /* Collide */ | 1 /* AudioSource */;
function sys_control_ball(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$2) === QUERY$2) {
update$1(game, i);
}
}
}
function update$1(game, entity) {
let transform = game[8 /* Transform2D */][entity];
let move = game[6 /* Move */][entity];
let collide = game[1 /* Collide */][entity];
let audio = game[0 /* AudioSource */][entity];
if (transform.Translation[0] < 0) {
transform.Translation[0] = 0;
move.Direction[0] = -move.Direction[0];
audio.Trigger = snd_bounce_wall;
audio.HalfTones = 0;
}
if (transform.Translation[0] > game.ViewportWidth) {
transform.Translation[0] = game.ViewportWidth;
move.Direction[0] = -move.Direction[0];
audio.Trigger = snd_bounce_wall;
audio.HalfTones = 0;
}
if (transform.Translation[1] < 0) {
transform.Translation[1] = 0;
move.Direction[1] = -move.Direction[1];
audio.Trigger = snd_bounce_wall;
audio.HalfTones = 0;
}
if (transform.Translation[1] > game.ViewportHeight) {
transform.Translation[1] = game.ViewportHeight;
move.Direction[1] = -move.Direction[1];
audio.Trigger = snd_bounce_wall;
audio.HalfTones = 0;
}
if (collide.Collisions.length > 0) {
game[9 /* Shake */][game.Camera].Duration = 0.2;
let collision = collide.Collisions[0];
if (collision.Hit[0]) {
transform.Translation[0] += collision.Hit[0];
let from_center = collide.Center[1] - collision.Other.Center[1];
let other_half = collision.Other.Size[1] / 2;
move.Direction[0] = -move.Direction[0];
move.Direction[1] = from_center / other_half;
}
if (collision.Hit[1]) {
transform.Translation[1] += collision.Hit[1];
let from_center = collide.Center[0] - collision.Other.Center[0];
let other_half = collision.Other.Size[0] / 2;
move.Direction[0] = from_center / other_half;
move.Direction[1] = -move.Direction[1];
}
if (game.World[collision.Other.EntityId] & 8 /* ControlBrick */) {
let control = game[2 /* ControlBall */][entity];
control.Bounces += 1;
audio.Trigger = snd_bounce_brick;
audio.HalfTones = control.Bounces;
}
if (game.World[collision.Other.EntityId] & 16 /* ControlPaddle */) {
let control = game[2 /* ControlBall */][entity];
control.Bounces = 0;
audio.Trigger = snd_bounce_paddle;
audio.HalfTones = 0;
}
normalize(move.Direction, move.Direction);
game.Add(get_blu_explosion(transform.Translation[0], transform.Translation[1], "white", 15));
if (Math.random() > 0.95) {
let child = game.Add({
...get_ball_blueprint(game),
Translation: [transform.Translation[0], transform.Translation[1]],
});
game[8 /* Transform2D */][game.Camera].Children.push(game[8 /* Transform2D */][child]);
game[8 /* Transform2D */][child].Parent = game[8 /* Transform2D */][game.Camera];
}
}
let angle = Math.atan(move.Direction[1] / move.Direction[0]);
transform.Rotation = angle;
game.Add({
...get_blu_tail(20, 20, "orange"),
Translation: [...transform.Translation],
Rotation: angle,
});
}

function linear(t) {
return t;
}
function ease_in_out_elastic(t) {
return (t -= 0.5) < 0
? (0.02 + 0.01 / t) * Math.sin(50 * t)
: (0.02 - 0.01 / t) * Math.sin(50 * t) + 1;
}

const QUERY$3 = 256 /* Transform2D */ | 8 /* ControlBrick */ | 2 /* Collide */ | 1024 /* Fade */;
function sys_control_brick(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$3) === QUERY$3) {
update$2(game, i);
}
}
}
function update$2(game, entity) {
let collide = game[1 /* Collide */][entity];
let translation = game[8 /* Transform2D */][entity].Translation;
let entry = game[11 /* Entry */][entity];
let fade = game[10 /* Fade */][entity];
if (collide.Collisions.length > 0) {
fade.Step = 0.025;
entry.Initial = translation;
entry.Final = [translation[0], game.ViewportHeight + 20];
entry.Time = 0.5;
entry.CurrentTime = 0;
entry.Easing = linear;
game.World[entity] |= 2048 /* Entry */;
}
}

const QUERY$4 = 256 /* Transform2D */ | 16 /* ControlPaddle */;
function sys_control_paddle(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$4) == QUERY$4) {
update$3(game, i);
}
}
}
function update$3(game, entity) {
let transform = game[8 /* Transform2D */][entity];
let control = game[4 /* ControlPaddle */][entity];




let x = transform.Translation[0] + game.InputEvent.mouse_x;
if (x < control.Width / 2) {
transform.Translation[0] = control.Width / 2;
}
else if (game.ViewportWidth - control.Width / 2 < x) {
transform.Translation[0] = game.ViewportWidth - control.Width / 2;
}
else {
transform.Translation[0] = x;
}
transform.Dirty = true;
}

const QUERY$5 = 256 /* Transform2D */ | 32 /* Draw */;
function sys_draw2d(game, delta) {
game.Context2D.resetTransform();
game.Context2D.fillStyle = game.ClearColor;
game.Context2D.fillRect(0, 0, game.ViewportWidth, game.ViewportHeight);
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$5) == QUERY$5) {
let transform = game[8 /* Transform2D */][i];
game.Context2D.setTransform(transform.World[0], transform.World[1], transform.World[2], transform.World[3], transform.World[4], transform.World[5]);
let draw = game[5 /* Draw */][i];
switch (draw.Kind) {
case 1 /* Rect */:
draw_rect$1(game, draw);
break;
}
}
}
}
function draw_rect$1(game, draw) {
game.Context2D.globalAlpha = draw.Alpha;
game.Context2D.fillStyle = draw.Color;
game.Context2D.filter = draw.Filter;
game.Context2D.fillRect(-draw.Width / 2, -draw.Height / 2, draw.Width, draw.Height);
}

const QUERY$6 = 256 /* Transform2D */ | 2048 /* Entry */;
function sys_entry(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$6) == QUERY$6) {
update$4(game, i, delta);
}
}
}
function update$4(game, entity, delta) {
let entry = game[11 /* Entry */][entity];
let transform = game[8 /* Transform2D */][entity];
let collide = game[1 /* Collide */][entity];
if (entry.CurrentTime <= entry.Time) {
let time = entry.Easing(entry.CurrentTime / entry.Time);
transform.Translation = lerp([0, 0], entry.Initial, entry.Final, time);
entry.CurrentTime += delta;
transform.Dirty = true;
game.Add({
...get_blu_tail(100, 20, "green"),
Translation: [...transform.Translation],
});
if (collide) {
collide.New = true;
}
}
else {
transform.Translation = [...entry.Final];
game.World[entity] &= ~2048 /* Entry */;

}
}

const QUERY$7 = 256 /* Transform2D */ | 1024 /* Fade */;
function sys_fade(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$7) == QUERY$7) {
update$5(game, i);
}
}
}
function update$5(game, entity, delta) {
let fade = game[10 /* Fade */][entity];
let draw = game[5 /* Draw */][entity];
let transform = game[8 /* Transform2D */][entity];
if (draw.Alpha > 0) {
draw.Alpha -= fade.Step;
transform.Scale = [Math.max(0, draw.Alpha), Math.max(0, draw.Alpha)];
transform.Dirty = true;
if (draw.Alpha <= 0) {
game.Destroy(entity);
}
}
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

const QUERY$8 = 256 /* Transform2D */ | 64 /* Move */;
function sys_move(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$8) === QUERY$8) {
update$6(game, i, delta);
}
}
}
function update$6(game, entity, delta) {
let transform = game[8 /* Transform2D */][entity];
let move = game[6 /* Move */][entity];
transform.Translation[0] += move.Direction[0] * move.Speed * delta;
transform.Translation[1] += move.Direction[1] * move.Speed * delta;
transform.Dirty = true;
}

function sys_performance(game, delta, target) {
if (target) {
target.textContent = delta.toFixed(1);
}
}

const QUERY$9 = 256 /* Transform2D */ | 512 /* Shake */;
function sys_shake(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$9) == QUERY$9) {
update$7(game, i, delta);
}
}
}
function update$7(game, entity, delta) {
let shake = game[9 /* Shake */][entity];
if (shake.Duration > 0) {
shake.Duration -= delta;
let transform = game[8 /* Transform2D */][entity];
transform.Translation = [
shake.Strength - Math.random() * (shake.Strength * 2),
shake.Strength - Math.random() * (shake.Strength * 2),
];
transform.Dirty = true;
game.ClearColor = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() *
255})`;
if (shake.Duration <= 0) {
shake.Duration = 0;
transform.Translation = [0, 0];
game.ClearColor = `black`;
}
}
}

const QUERY$a = 256 /* Transform2D */;
function sys_transform2d(game, delta) {
for (let i = 0; i < game.World.length; i++) {
if ((game.World[i] & QUERY$a) === QUERY$a) {
update$8(game[8 /* Transform2D */][i]);
}
}
}
function update$8(transform) {
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

function shift(values) {
let value = values.shift();
if (value === false || value === undefined) {
return "";
}
else if (Array.isArray(value)) {
return value.join("");
}
else {
return value;
}
}
function html(strings, ...values) {
return strings.reduce((out, cur) => out + shift(values) + cur);
}

function App(state) {
return html `
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

let prev;
function sys_ui(game, delta) {
let next = App();
if (next !== prev) {
game.UI.innerHTML = prev = next;
}
}

var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
const MAX_ENTITIES = 10000;
class Game {
constructor() {
this.World = [];

this[_a] = [];
this[_b] = [];
this[_c] = [];
this[_d] = [];
this[_e] = [];
this[_f] = [];
this[_g] = [];
this[_h] = [];
this[_j] = [];
this[_k] = [];
this[_l] = [];
this[_m] = [];
this.ViewportWidth = window.innerWidth;
this.ViewportHeight = window.innerHeight;
this.UI = document.querySelector("main");
this.Audio = new AudioContext();
this.InputState = { mouse_x: 0, mouse_y: 0 };
this.InputEvent = { mouse_x: 0, mouse_y: 0, wheel_y: 0 };
this.Camera = 0;

this.ClearColor = "white";
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
this.UI.addEventListener("click", () => this.UI.requestPointerLock());
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
sys_shake(this, delta);
sys_fade(this);
sys_entry(this, delta);
sys_move(this, delta);
sys_transform2d(this);
sys_collide(this);
sys_audio(this, delta);
sys_draw2d(this);
sys_ui(this);

sys_framerate(this, delta);
sys_performance(this, performance.now() - now, document.querySelector("#frame"));
}
Start() {
let last = performance.now();
let tick = (now) => {
let delta = (now - last) / 1000;
this.Update(delta);

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
Add({ Translation, Rotation, Scale, Using = [], Children = [] }) {
let entity = this.CreateEntity();
transform2d(Translation, Rotation, Scale)(this, entity);
for (let mixin of Using) {
mixin(this, entity);
}
let entity_transform = this[8 /* Transform2D */][entity];
for (let subtree of Children) {
let child = this.Add(subtree);
let child_transform = this[8 /* Transform2D */][child];
child_transform.Parent = entity_transform;
entity_transform.Children.push(child_transform);
}
return entity;
}
Destroy(entity) {
let mask = this.World[entity];
if (mask & 256 /* Transform2D */) {
for (let child of this[8 /* Transform2D */][entity].Children) {
this.Destroy(child.EntityId);
}
}
this.World[entity] = 0;
}
}
_a = 0 /* AudioSource */, _b = 1 /* Collide */, _c = 2 /* ControlBall */, _d = 3 /* ControlBrick */, _e = 4 /* ControlPaddle */, _f = 5 /* Draw */, _g = 6 /* Move */, _h = 7 /* Named */, _j = 8 /* Transform2D */, _k = 9 /* Shake */, _l = 10 /* Fade */, _m = 11 /* Entry */;

function control_brick() {
return (game, entity) => {
game.World[entity] |= 8 /* ControlBrick */;
game[3 /* ControlBrick */][entity] = {};
};
}

function entry(Initial, Final, Time) {
return (game, entity) => {
game.World[entity] |= 2048 /* Entry */;
game[11 /* Entry */][entity] = {
Initial,
Final,
Time,
CurrentTime: 0,
Easing: ease_in_out_elastic,
};
};
}

function create_brick(width, height, x, y, time) {
return {
Using: [
control_brick(),
collide(false, [width, height]),
draw_rect(width, height, "green"),
fade(0),
entry([x, -100], [x, y], time),
],
};
}

function control_paddle(Width) {
return (game, entity) => {
game.World[entity] |= 16 /* ControlPaddle */;
game[4 /* ControlPaddle */][entity] = {
Width,
};
};
}

let get_paddle_blueprint = function (game) {
let x = game.ViewportWidth / 2;
let y = game.ViewportHeight - 20;
return {
Translation: [x, y],
Using: [
control_paddle(100),
collide(true, [100, 20]),
draw_rect(100, 20, "red"),
entry([x, -10], [x, y], 1),
],
};
};

function shake(Duration = 0, Strength = 5) {
return (game, entity) => {
game.World[entity] |= 512 /* Shake */;
game[9 /* Shake */][entity] = {
Duration,
Strength,
};
};
}

function world_stage(game) {
game.World = [];
game.ClearColor = "black";
let col_count = 5;
let row_count = 5;
let brick_width = 100;
let brick_height = 20;
let padding = 10;
let top_left_x = (game.ViewportWidth - brick_width * col_count - padding * (col_count - 1)) / 2;
let top_left_y = 100;
let bricks = [];
for (let row = 0; row < row_count; row++) {
let y = top_left_y + row * (brick_height + padding) + brick_height / 2;
for (let col = 0; col < col_count; col++) {
let x = top_left_x + col * (brick_width + padding) + brick_width / 2;
bricks.push({
Translation: [x, y],
...create_brick(brick_width, brick_height, x, y, 0.5 + Math.random()),
});
}
}
game.Camera = game.Add({
Using: [shake(0, 10)],
Children: [
{
...get_paddle_blueprint(game),
},
{
...get_ball_blueprint(game),
},
...bricks,
],
});
}

let game = new Game();
world_stage(game);
game.Start();

window.$ = (...args) => dispatch();

window.game = game;

}());