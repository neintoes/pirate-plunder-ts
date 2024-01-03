// condense with treasure?
// GH1
class Port extends sprites.ExtendableSprite {
    hitbox: Hitbox;

    constructor(location: tiles.Location) {
        super(assets.image`port`, SpriteKind.Port)
        //this.hitbox = new Hitbox(this, 20, SpriteKind.PortHitbox);
        tiles.placeOnTile(this, location);
    }
}
// end GH1