// GH3
class WhirlPool extends sprites.ExtendableSprite {
    constructor() {
        super(assets.image`whirlpool`, SpriteKind.Pool);
        tiles.placeOnRandomTile(this, assets.tile`water`);
        this.lifespan = 10000
        this.z = -1
    }

    public affectShipVelocity(ship: PlayerSprite): void {
        ship.vx += Math.sign(this.x - ship.x) * 15
        ship.vy += Math.sign(this.y - ship.y) * 15
    }
}
// end GH3