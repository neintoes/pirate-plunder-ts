class Hitbox extends sprites.ExtendableSprite {
    public parent: any;
    private radius: number;

    constructor(parent: Sprite, radius: number, kind: number) {
        super(image.create(radius * 2.2, radius * 2.2), kind);
        this.parent = parent;
        this.radius = radius;
        spriteutils.drawCircle(this.image, 24, 24, this.radius, 1);
        this.setPosition(parent.x, parent.y);
        this.setFlag(SpriteFlag.Invisible, true);
    }
}

// class TreasureHitbox extends Hitbox {
//     constructor(parent: Treasure) {
//         super(20, SpriteKind.TreasureHitbox, parent);
//     }
// }

// // GH1
// class PortHitbox extends Hitbox {
//     constructor(parent: Port) {
//         super(20, SpriteKind.PortHitbox, parent)
//     }
// }
// end GH1