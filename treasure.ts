interface iCollectable {
    value: number;
}

class Treasure extends sprites.ExtendableSprite implements iCollectable {
    public value: number;
    public hitbox: Sprite;

    constructor(spawnPoint: tiles.Location) {
        super(assets.image`treasure`, SpriteKind.Treasure);
        tiles.placeOnTile(this, spawnPoint);
        this.value = randint(500, 2000);
        //this.hitbox = new Hitbox(this, 20, SpriteKind.TreasureHitbox);
    }
}

class TreasureSpawner {
    playerSprite: PlayerSprite;

    constructor(playerSprite: PlayerSprite) {
        this.playerSprite = playerSprite;
        for (let i = 0; i < 10; i++) {
            this.treasureSpawning();
        }
    }

    public treasureSpawning(): void {
        if (sprites.allOfKind(SpriteKind.Treasure).length < 10) {
            let tile = tilesAdvanced.getAllWallTiles()._pickRandom();
            new Treasure(tile);
        }
    }
}
