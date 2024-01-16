// GH3
class WhirlPool extends sprites.ExtendableSprite {
    constructor() {
        super(assets.image`whirlpool`, SpriteKind.Pool);
        tiles.placeOnRandomTile(this, assets.tile`water`);
        this.lifespan = 10000
        this.z = -1
    }

    public pullIfInProximity(ship: PlayerSprite): void {
        if (spriteutils.distanceBetween(this, ship) < 100) {
            ship.vx += Math.sign(this.x - ship.x) * 15;
            ship.vy += Math.sign(this.y - ship.y) * 15;
        }
    }
}
// end GH3