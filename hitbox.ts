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
