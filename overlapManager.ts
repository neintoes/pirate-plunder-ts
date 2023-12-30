class OverlapManager {
    gameManager: GameManager;

    constructor(gameManager: GameManager) {
        this.gameManager = gameManager;
        this.registerOverlaps();
    }

    private registerOverlaps(): void {
        // fort hit
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, (fort: Fort, projectile: PlayerProjectile) => {
            fort.healthbar.value -= 10;
            projectile.destroy()
            if (fort.healthbar.value < 1) {
                fort.destroy();
            }
        })

        // player hit
        sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, (playerSprite: PlayerSprite, projectile: EnemyProjectile) => {
            info.changeLifeBy(-1);
            projectile.destroy();
        });

        // fix double spawning
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, (enemy: Fort, otherEnemy: Fort) => {
            sprites.allOfKind(SpriteKind.Enemy).pop().destroy();
        });
        // GH1
        // double spawning fixes cont.
        sprites.onOverlap(SpriteKind.Treasure, SpriteKind.Treasure, (treasure: Sprite, otherTreasure: Sprite) => {
            sprites.allOfKind(SpriteKind.Treasure).pop().destroy();
        });
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Treasure, (enemy: Sprite, treasure: Sprite) => {
            sprites.allOfKind(SpriteKind.Treasure).pop().destroy();
        });
        // end GH1

        // GH1
        // treasure pickup
        sprites.onOverlap(SpriteKind.Player, SpriteKind.Hitbox, (playerSprite: PlayerSprite, hitbox: Hitbox) => {
            info.changeScoreBy(hitbox.parent.value);
            hitbox.parent.destroy();
            hitbox.destroy();
        });
        // end GH1
    }
}