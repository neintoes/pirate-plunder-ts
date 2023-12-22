abstract class Projectile extends sprites.ExtendableSprite {
    private speed: number;

    constructor(kind: number, speed: number, originSprite: Sprite, angle: number) {
        super(assets.image`cannon ball`, kind);
        this.setPosition(originSprite.x, originSprite.y);
        this.lifespan = 1500;
        this.setFlag(SpriteFlag.GhostThroughWalls, true);
        this.speed = speed;
        this.launch(angle);
    }

    private launch(angle: number): void {
        spriteutils.setVelocityAtAngle(this, angle, this.speed);
    }
}

class PlayerProjectile extends Projectile {
    constructor(originSprite: PlayerSprite, angle: number) {
        super(SpriteKind.Projectile, 100, originSprite, angle);
    }
}

class EnemyProjectile extends Projectile {
    constructor(originSprite: Fort, angle: number) {
        super(SpriteKind.EnemyProjectile, 100, originSprite, angle);
    }
}