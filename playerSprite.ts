class PlayerSprite extends sprites.ExtendableSprite {
    readonly turnSpeed: number = 0.2;
    private acceleration: number = 1.5;
    private currentSpeed = 0;
    private currentRotation = 0;
    public treasureOnboard: number = 0;

    constructor() {
        super(assets.image`ship`, SpriteKind.Player);
        this.registerControls();
    }

    private registerControls() {
        controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
            for (let rotation = 0; rotation < 181; rotation += 180) {
                let angle = transformSprites.getRotation(this) + rotation;
                let angleInRadians = spriteutils.degreesToRadians(angle);
                new PlayerProjectile(this, angleInRadians);
            }
        });
    }

    private turn() {
        if (controller.left.isPressed()) {
            this.currentRotation -= this.turnSpeed;
        } else if (controller.right.isPressed()) {
            this.currentRotation += this.turnSpeed;
        }

        this.currentRotation *= 0.7
        transformSprites.changeRotation(this, this.currentRotation * this.currentSpeed / 10);
    }

    private move() {
        if (controller.up.isPressed()) {
            this.currentSpeed += this.acceleration;
        } else if (controller.down.isPressed()) {
            this.currentSpeed -= this.acceleration;
        }

        this.currentSpeed *= 0.98
        let angle = spriteutils.degreesToRadians(transformSprites.getRotation(this) - 90);
        spriteutils.setVelocityAtAngle(this, angle, this.currentSpeed);
    }

    public shipMotion(): void {
        this.turn();
        this.move();
    }
}
