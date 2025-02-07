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

            // GH1
            this.gameManager.playerSprite.treasureOnboard = this.gameManager.playerSprite.treasureOnboard / 2;
            // end GH1
        });

        // fix double spawning
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, (enemy: Fort, otherEnemy: Fort) => {
            sprites.allOfKind(SpriteKind.Enemy).pop().destroy();
        });
        sprites.onOverlap(SpriteKind.Treasure, SpriteKind.Treasure, (treasure: Sprite, otherTreasure: Sprite) => {
            sprites.allOfKind(SpriteKind.Treasure).pop().destroy();
        });
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Treasure, (enemy: Sprite, treasure: Sprite) => {
            sprites.allOfKind(SpriteKind.Treasure).pop().destroy();
        });
        sprites.onOverlap(SpriteKind.Treasure, SpriteKind.Treasure, (treasure: Sprite, otherTreasure: Sprite) => {
            sprites.allOfKind(SpriteKind.Treasure).pop().destroy();
        });
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Treasure, (enemy: Sprite, treasure: Sprite) => {
            sprites.allOfKind(SpriteKind.Treasure).pop().destroy();
        });

        // treasure pickup
        sprites.onOverlap(SpriteKind.Player, SpriteKind.TreasureHitbox, (playerSprite: PlayerSprite, hitbox: Hitbox) => {
            // COMMENTED OUT FOR GH1:
            //info.changeScoreBy(hitbox.parent.value);
            // GH1
            this.gameManager.playerSprite.treasureOnboard += hitbox.parent.value;
            this.gameManager.treasureCounter.updateText();
            // end GH1
            hitbox.parent.destroy();
            hitbox.destroy();
        });

        // GH1
        sprites.onOverlap(SpriteKind.Player, SpriteKind.PortHitbox, (playerSprite: PlayerSprite, hitbox: Hitbox) => {
            info.changeScoreBy(this.gameManager.playerSprite.treasureOnboard);
            this.gameManager.playerSprite.treasureOnboard = 0;
            this.gameManager.treasureCounter.updateText();
        });
        // end GH1
    }
}