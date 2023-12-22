class Fort extends sprites.ExtendableSprite {
    private fireRate: number = 100;

    constructor(location: tiles.Location) {
        super(assets.image`fort`, SpriteKind.Enemy);
        tiles.placeOnTile(this, location);
    }

    public fire(target: Sprite): void {
        if (randint(0, this.fireRate) == 0) {
            // let proj: Sprite;
            // let angle: number;
            // if (randint(1, 100) == 1 && spriteutils.distanceBetween(fort, ship) < 80) {
            //     proj = make_projectile(fort, SpriteKind.enemy_projectile)
            //     angle = spriteutils.angleFrom(fort, ship)
            //     spriteutils.setVelocityAtAngle(proj, angle, 100)
            // }
        }
    }
}

class FortManager {
    playerSprite: PlayerSprite;

    constructor(playerSprite: PlayerSprite) {
        for(let i = 0; i < 10; i++) {
            this.spawnFort();
        }
    }

    public spawnFort(): void {
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