class PlayerSprite extends sprites.ExtendableSprite {
    readonly turnSpeed: number = 0.2;
    private acceleration: number = 1.5;

    constructor() {
        super(assets.image`ship`, SpriteKind.Player);
    }
}
