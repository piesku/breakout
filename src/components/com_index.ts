const enum Component {
    Collide,
    ControlBall,
    ControlBrick,
    ControlPaddle,
    Draw,
    Move,
    Transform2D,
}

export const enum Has {
    Collide = 1 << Component.Collide,
    ControlBall = 1 << Component.ControlBall,
    ControlBrick = 1 << Component.ControlBrick,
    ControlPaddle = 1 << Component.ControlPaddle,
    Draw = 1 << Component.Draw,
    Move = 1 << Component.Move,
    Transform2D = 1 << Component.Transform2D,
}
