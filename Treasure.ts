// GH1
interface iCollectable {
    value: number;
}

class Treasure extends sprites.ExtendableSprite implements iCollectable{
    public value: number;
    private hitbox: Sprite;

    constructor(spawnPoint: tiles.Location) {
        super(assets.image`treasure`, SpriteKind.Treasure);
        tiles.placeOnTile(this, spawnPoint);
        new Hitbox(this);
        this.value = randint(500, 2000);
    }
}

class Hitbox extends sprites.ExtendableSprite{
    public parent: Treasure;

    constructor(parent: Treasure) {
        super(image.create(47, 47), SpriteKind.Hitbox)
        this.parent = parent;
        spriteutils.drawCircle(this.image, 24, 24, 20, 1)
        this.setFlag(SpriteFlag.Invisible, true)
        tiles.placeOnTile(this, this.parent.tilemapLocation());
    }
}

class TreasureSpawner {
    constructor() {
        for (let i = 0; i < 10; i++) {
            this.treasureSpawning();
        }
    }

    public treasureSpawning(): void {
        if(sprites.allOfKind(SpriteKind.Treasure).length < 10) {
            let tile = tilesAdvanced.getAllWallTiles()._pickRandom();
            new Treasure(tile);
        }
    }
}
// end GH1