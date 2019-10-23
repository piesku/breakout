export function animate(clips) {
    return (game, entity) => {
        let States = {};
        for (let name in clips) {
            let { Keyframes, Flags = 7 /* Default */ } = clips[name];
            let duration = Keyframes[Keyframes.length - 1].Timestamp;
            States[name] = {
                // One-level-deep copy of the clip's keyframes. When
                // AnimationFlag.Alternate is set, sys_animate recalculates
                // keyframes' timestamps after each alternation. We want to
                // modify copies of the timestamps defined in the clip. It's OK
                // to copy other keyframe properties by reference.
                Keyframes: Keyframes.map(keyframe => ({ ...keyframe })),
                Flags,
                Duration: duration,
                Time: 0,
            };
        }
        game.World[entity] |= 1 /* Animate */;
        game[0 /* Animate */][entity] = {
            States,
            Current: States[1 /* Idle */],
        };
    };
}
//# sourceMappingURL=com_animate.js.map