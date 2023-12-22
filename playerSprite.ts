class PlayerSprite extends sprites.ExtendableSprite {
    readonly turnSpeed: number = 0.2;
    private acceleration: number = 1.5;
    private speed = 0;

    constructor() {
        super(assets.image`ship`, SpriteKind.Player);
        this.registerControls();
    }

    private registerControls() {
        controller.A.onEvent(ControllerButtonEvent.Pressed, () => {
            let angle: number;
            for (let rotation = 0; rotation < 181; rotation += 180) {
                angle = transformSprites.getRotation(this) + rotation;
                spriteutils.degreesToRadians(angle);
                new PlayerProjectile(this, angle);
            }
        });
    }

    private turn() {
        let rotation = transformSprites.getRotation(this);
        if (controller.left.isPressed()) {
            rotation -= this.turnSpeed;
        } else if (controller.right.isPressed()) {
            rotation += this.turnSpeed;
        }

        rotation *= 0.7
        transformSprites.changeRotation(this, rotation * this.speed / 10);
    }

    private move() {
        if (controller.up.isPressed()) {
            this.speed += this.acceleration;
        } else if (controller.down.isPressed()) {
            this.speed -= this.acceleration;
        }

        this.speed *= 0.98
        let angle = spriteutils.degreesToRadians(transformSprites.getRotation(this) - 90);
        spriteutils.setVelocityAtAngle(this, angle, this.speed);
    }

    public shipMotion(): void {
        this.turn();
        this.move();
    }
}
