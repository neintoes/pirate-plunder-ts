namespace SpriteKind {
    export const Treasure = SpriteKind.create();
    export const Hitbox = SpriteKind.create();
    export const EnemyProjectile = SpriteKind.create();
}

class GameManager {
    private playerSprite: PlayerSprite;
    // private overlapManager: OverlapManager;

    constructor() {
        this.initialisePlayer();
        // this.overlapManager = new OverlapManager(this.playerSprite);
        this.onUpdates();
        this.onUpdateIntervals();
    }

    private initialisePlayer(): void {
        info.setScore(0);
        info.setLife(3);
        this.playerSprite = new PlayerSprite();
    }

    private onUpdates(): void {
        game.onUpdate(function (): void {
            return
        })
    }

    private onUpdateIntervals(): void {
        return
    }
}