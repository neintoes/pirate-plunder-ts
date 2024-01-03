class Fort extends sprites.ExtendableSprite {
    private fireRate: number = 100;
    public healthbar: StatusBarSprite;

    constructor(location: tiles.Location) {
        super(assets.image`fort`, SpriteKind.Enemy);
        tiles.placeOnTile(this, location);
        this.healthbar = statusbars.create(20, 4, StatusBarKind.EnemyHealth);
        this.healthbar.attachToSprite(this);
    }

    public fire(target: Sprite): void {
        if (randint(0, this.fireRate) == 0 && spriteutils.distanceBetween(this, sprites.allOfKind(SpriteKind.Player)[0]) < 80) {
            let angle = spriteutils.angleFrom(this, target);
            new EnemyProjectile(this, angle);
        }
    }
}

class FortManager {
    playerSprite: PlayerSprite;

    constructor(playerSprite: PlayerSprite) {
        this.playerSprite = playerSprite;
        for(let i = 0; i < 10; i++) {
            this.fortSpawning();
        }
    }

    public fortSpawning(): void {
        if (sprites.allOfKind(SpriteKind.Enemy).length < 10) {
            let tile = tilesAdvanced.getAllWallTiles()._pickRandom();
            new Fort(tile);
        }
    }

    public fortFire(): void {
        sprites.allOfKind(SpriteKind.Enemy).forEach((fort: Fort) => {
            fort.fire(this.playerSprite);
        });
    }
}