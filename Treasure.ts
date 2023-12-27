interface iCollectable {
    value: number;
}

class Treasure extends sprites.ExtendableSprite implements iCollectable{
    public value: number = 100;

    constructor(spawnPoint: tiles.Location) {
        super(assets.image`treasure`, SpriteKind.Treasure);
        tiles.placeOnTile(this, spawnPoint);
    }
}