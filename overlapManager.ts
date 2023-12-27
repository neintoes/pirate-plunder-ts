class OverlapManager {
    constructor() {
        this.registerOverlaps();
    }

    private registerOverlaps(): void {
        // fort hit
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, (fort: Fort, projectile: PlayerProjectile) => {
            fort.healthbar.value -= 10;
            projectile.destroy()
            if (fort.healthbar.value < 1) {
                new Treasure(fort.tilemapLocation());
                fort.destroy();
            }
        })

        // player hit
        sprites.onOverlap(SpriteKind.Player, SpriteKind.EnemyProjectile, (playerSprite: PlayerSprite, projectile: EnemyProjectile) => {
            info.changeLifeBy(-1);
            projectile.destroy();
        });

        // fix double spawn
        sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Enemy, (enemy: Sprite, other_enemy: Sprite) => {
            sprites.allOfKind(SpriteKind.Enemy).pop().destroy();
        });
    }
}