// condense with treasure?
// GH1
class Port extends sprites.ExtendableSprite {
    hitbox: Hitbox;

    constructor(location: tiles.Location) {
        super(assets.image`port`, SpriteKind.Port)
        tiles.placeOnTile(this, location);
        this.hitbox = new Hitbox(this, 20, SpriteKind.PortHitbox);
    }
}
// end GH1